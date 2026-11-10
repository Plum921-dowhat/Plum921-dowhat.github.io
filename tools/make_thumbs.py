"""Generate grid thumbnails for the images displayed at small sizes.

The gallery grid and the avatar frame render at a few hundred CSS pixels,
while the lightbox displays the original file at full resolution. Serving the
originals everywhere wastes bandwidth on every page load. This script derives
a downscaled copy per source image under a sibling ``thumbs`` directory; the
originals stay untouched and remain the only source the lightbox reads.

Usage:
    python tools/make_thumbs.py            # incremental, skips up-to-date files
    python tools/make_thumbs.py --force    # rebuild every thumbnail

Output naming: <dir>/thumbs/<stem>.webp
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

ASSET_ROOT = Path(__file__).resolve().parent.parent / "assets"
SOURCE_DIRS = [ASSET_ROOT / "artworks", ASSET_ROOT / "avatar"]
SOURCE_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp"}
LONG_EDGE = 800
QUALITY = 82

# When a stem exists in several formats, keep the one that compressed it least:
# the source images live as lossless WebP now, and a matching PNG or JPEG is a
# higher-quality master that should win if both are present.
FORMAT_PRIORITY = {".png": 0, ".jpg": 1, ".jpeg": 2, ".webp": 3}


def collect_sources() -> list[Path]:
    """Return one source per image, ignoring the derived files in ``thumbs``."""
    best: dict[Path, Path] = {}
    for directory in SOURCE_DIRS:
        if not directory.is_dir():
            continue
        for path in directory.iterdir():
            if not path.is_file() or path.suffix.lower() not in SOURCE_SUFFIXES:
                continue
            stem = path.parent / path.stem
            current = best.get(stem)
            if current is None or FORMAT_PRIORITY[path.suffix.lower()] < FORMAT_PRIORITY[current.suffix.lower()]:
                best[stem] = path
    return [best[key] for key in sorted(best)]


def render(src: Path, force: bool) -> tuple[Path, int, int]:
    """Write the thumbnail for one source image.

    Returns the destination path, the source size and the output size in bytes.
    A negative output size means an up-to-date thumbnail was skipped.
    """
    out_dir = src.parent / "thumbs"
    dst = out_dir / (src.stem + ".webp")
    if not force and dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
        return dst, src.stat().st_size, -1

    out_dir.mkdir(exist_ok=True)
    with Image.open(src) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"):
            has_alpha = im.mode in ("LA", "PA") or "transparency" in im.info
            im = im.convert("RGBA" if has_alpha else "RGB")
        width, height = im.size
        scale = min(1.0, LONG_EDGE / max(width, height))
        if scale < 1.0:
            size = (max(1, round(width * scale)), max(1, round(height * scale)))
            im = im.resize(size, Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)

    return dst, src.stat().st_size, dst.stat().st_size


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate downscaled copies for small-image contexts.")
    parser.add_argument("--force", action="store_true", help="rebuild thumbnails even if up to date")
    args = parser.parse_args()

    sources = collect_sources()
    if not sources:
        print(f"no source images found under {ASSET_ROOT}")
        return 1

    total_src = total_dst = 0
    for src in sources:
        dst, src_size, dst_size = render(src, args.force)
        label = f"{src.parent.name}/{src.name}"
        total_src += src_size
        if dst_size < 0:
            dst_size = dst.stat().st_size
            print(f"skip  {label:<24} up to date")
        else:
            print(f"write {label:<24} {src_size / 1048576:6.2f} MB -> {dst_size / 1024:6.0f} KB "
                  f"({dst_size / src_size * 100:.1f}%)")
        total_dst += dst_size

    print(f"\ntotal {total_src / 1048576:.1f} MB -> {total_dst / 1048576:.2f} MB "
          f"({total_dst / total_src * 100:.1f}%)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
