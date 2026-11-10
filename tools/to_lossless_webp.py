"""Re-encode the source images as lossless WebP.

The lightbox reads the original files, which for this gallery are large PNGs
(up to 15 MB each). Lossless WebP keeps every pixel identical while cutting
roughly half the bytes. Alongside each source image this script writes a
``.webp`` file of the same stem; the source file itself is never modified or
removed, so switching references back is always possible.

Two cases are reported instead of converted:

* the WebP output would be no smaller than the source - already-compressed
  JPEGs typically grow, because lossless encoding preserves the existing
  compression artefacts - and
* the image exceeds the WebP format limit of 16383 px on either axis.

Usage:
    py tools/to_lossless_webp.py                 # incremental, skips up-to-date files
    py tools/to_lossless_webp.py --force         # rebuild every WebP file
    py tools/to_lossless_webp.py --verify        # decode and compare every pixel
    py tools/to_lossless_webp.py --dir assets/code

Output naming: <dir>/<stem>.webp
"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path

from PIL import Image, ImageChops

ASSET_ROOT = Path(__file__).resolve().parent.parent / "assets"
DEFAULT_DIRS = [ASSET_ROOT / "artworks", ASSET_ROOT / "code", ASSET_ROOT / "avatar"]
SOURCE_SUFFIXES = {".png", ".jpg", ".jpeg"}
DEFAULT_METHOD = 4

# WebP refuses anything wider or taller than this.
WEBP_MAX_EDGE = 16383


def collect_sources(directories: list[Path]) -> list[Path]:
    found: list[Path] = []
    for directory in directories:
        if not directory.is_dir():
            continue
        found.extend(p for p in sorted(directory.iterdir())
                     if p.is_file() and p.suffix.lower() in SOURCE_SUFFIXES)
    return found


def flatten(im: Image.Image) -> tuple[Image.Image, Image.Image | None]:
    """Return an opaque RGB view of the image plus its original alpha channel.

    Comparing two images through this view ignores colour values stored under
    fully transparent pixels, which lossless WebP is allowed to discard.
    """
    if im.mode in ("RGBA", "LA", "PA") or "transparency" in im.info:
        rgba = im.convert("RGBA")
        backdrop = Image.new("RGBA", rgba.size, (255, 0, 255, 255))
        return Image.alpha_composite(backdrop, rgba).convert("RGB"), rgba.getchannel("A")
    return im.convert("RGB"), None


def opaque(alpha: Image.Image) -> bool:
    """True when every pixel of the channel is fully opaque."""
    return alpha.getextrema()[0] == 255


def matches(source: Image.Image, result: Image.Image) -> bool:
    """Pixel-exact comparison, with transparency treated as a visual result.

    A fully opaque alpha channel is dropped by the encoder, so one side may
    come back without it; that is not a difference.
    """
    if source.size != result.size:
        return False
    src_rgb, src_alpha = flatten(source)
    dst_rgb, dst_alpha = flatten(result)
    if ImageChops.difference(src_rgb, dst_rgb).getbbox() is not None:
        return False
    if src_alpha is None and dst_alpha is None:
        return True
    if src_alpha is None:
        return opaque(dst_alpha)
    if dst_alpha is None:
        return opaque(src_alpha)
    return ImageChops.difference(src_alpha, dst_alpha).getbbox() is None


def convert(src: Path, args: argparse.Namespace) -> dict:
    dst = src.with_suffix(".webp")
    record = {"src": src, "dst": dst, "src_size": src.stat().st_size, "dst_size": 0,
              "status": "done", "note": "", "seconds": 0.0}

    if not args.force and dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
        record.update(status="skip", note="up to date", dst_size=dst.stat().st_size)
        return record

    if args.dry_run:
        record.update(status="plan", note="dry run", dst_size=0)
        return record

    started = time.time()
    with Image.open(src) as source:
        source.load()
        if max(source.size) > WEBP_MAX_EDGE:
            record.update(status="keep", note=f"{source.size[0]}x{source.size[1]} exceeds WebP limit")
            return record

        buffer = dst.with_name(dst.name + ".tmp")
        source.save(buffer, "WEBP", lossless=True, quality=100,
                    method=args.method, exact=args.exact)
        produced = buffer.stat().st_size
        record.update(dst_size=produced, seconds=time.time() - started)

        if produced >= record["src_size"]:
            buffer.unlink()
            record.update(status="keep", note="WebP would be larger")
            return record

        if args.verify:
            with Image.open(buffer) as decoded:
                decoded.load()
                if not matches(source, decoded):
                    buffer.unlink()
                    record.update(status="fail", note="pixel mismatch, source kept")
                    return record
            record["note"] = "verified"

        buffer.replace(dst)

    return record


def human(size: int) -> str:
    if size >= 1048576:
        return f"{size / 1048576:.2f} MB"
    return f"{size / 1024:.0f} KB"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Re-encode source images as lossless WebP next to the originals.")
    parser.add_argument("--dir", action="append", dest="dirs", metavar="PATH",
                        help="directory to scan; repeatable, defaults to artworks/code/avatar")
    parser.add_argument("--force", action="store_true", help="rebuild even if up to date")
    parser.add_argument("--verify", action="store_true",
                        help="decode each result and compare it with the source")
    parser.add_argument("--exact", action="store_true",
                        help="also preserve colour values under transparent pixels")
    parser.add_argument("--method", type=int, default=DEFAULT_METHOD, choices=range(0, 7),
                        help=f"compression effort, 0-6 (default {DEFAULT_METHOD}; 6 is far slower "
                             "without being smaller on artwork)")
    parser.add_argument("--dry-run", action="store_true", help="list what would be converted")
    args = parser.parse_args()

    directories = [Path(d).resolve() for d in args.dirs] if args.dirs else DEFAULT_DIRS
    sources = collect_sources(directories)
    if not sources:
        print(f"no source images found under {', '.join(str(d) for d in directories)}")
        return 1

    totals = {"src": 0, "dst": 0, "kept": 0}
    failures: list[Path] = []
    for src in sources:
        try:
            record = convert(src, args)
        except Exception as error:  # noqa: BLE001 - one bad file must not stop the batch
            print(f"error {src.name:<28} {error}")
            failures.append(src)
            continue

        label = f"{src.parent.name}/{src.name}"
        if record["status"] == "skip":
            print(f"skip  {label:<32} {human(record['dst_size']):>9}  up to date")
            totals["dst"] += record["dst_size"]
            totals["src"] += record["src_size"]
        elif record["status"] in ("keep", "fail"):
            print(f"keep  {label:<32} {human(record['src_size']):>9}  {record['note']}")
            totals["kept"] += record["src_size"]
        elif record["status"] == "plan":
            print(f"plan  {label:<32} {human(record['src_size']):>9}")
            totals["src"] += record["src_size"]
        else:
            ratio = record["dst_size"] / record["src_size"] * 100
            print(f"write {label:<32} {human(record['src_size']):>9} -> "
                  f"{human(record['dst_size']):>9} ({ratio:4.1f}%) "
                  f"{record['seconds']:5.1f}s {record['note']}")
            totals["src"] += record["src_size"]
            totals["dst"] += record["dst_size"]

    print()
    if totals["dst"]:
        saved = totals["src"] - totals["dst"]
        print(f"converted {human(totals['src'])} -> {human(totals['dst'])} "
              f"({totals['dst'] / totals['src'] * 100:.1f}%), saved {human(saved)}")
    if totals["kept"]:
        print(f"left untouched {human(totals['kept'])} in sources that would not shrink")
    if failures:
        print(f"failed on {len(failures)} file(s)")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
