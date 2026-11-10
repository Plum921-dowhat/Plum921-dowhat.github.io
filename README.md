# PLUM921 · 个人主页

个人主页静态站点（纯 HTML / CSS / JS，无构建、无依赖），可直接部署到 GitHub Pages。

风格：复古像素 · 低饱和红 + 米白
字体：[方舟像素字体 Ark Pixel Font](https://github.com/TakWolf/ark-pixel-font)（SIL OFL 1.1，文件已随仓库附带）

---

## 一、目录结构

```
Plum921-dowhat.github.io/
├── index.html            页面骨架（区块与占位标记都在这里）
├── artworks.html         全部画作（主页「显示更多」跳转）
├── code.html             全部代码演示（主页「显示更多」跳转）
├── videos.html           全部视频演示（主页「显示更多」跳转）
├── 404.html              GitHub Pages 的 404 页
├── favicon.svg           站点图标
├── .nojekyll             让 GitHub Pages 原样发布（别删）
├── css/style.css         全部样式，主题色集中在文件顶部 :root
├── js/
│   ├── data.js           ★ 内容配置：文字、链接、作品列表都改这里
│   └── main.js           交互逻辑（一般不用动）
├── fonts/                像素字体 + OFL 授权
├── tools/                辅助脚本：make_thumbs.py 生成缩略图，to_lossless_webp.py 转无损 WebP
└── assets/               素材目录
    ├── banner/           顶部像素横幅（建议 480×60 或更宽的横构图）
    ├── avatar/           头像（1 张）
    │   └── thumbs/       头像缩略图（脚本生成，勿手改）
    ├── artworks/         画作（建议 1:1 方图）
    │   └── thumbs/       画作缩略图（脚本生成，勿手改）
    ├── code/             代码截图 / 动图（建议 16:9）
    └── video/            视频文件与视频封面（建议 16:9）
```

## 二、本地预览

纯静态页面，直接双击 `index.html` 即可打开。需要更接近线上环境（相对路径、字体加载行为一致）时，在仓库根目录起一个本地服务：

```bash
python -m http.server 8080
# 然后访问 http://localhost:8080
#通常不建议这样做，但如果你想，这样是可以的
```

## 三、字体授权

字体文件按 SIL Open Font License 1.1 授权，完整文本见 `fonts/OFL.txt`。
要求保留字体名称「方舟像素 / Ark Pixel」，页脚已按规范署名并回链项目地址，**请勿删除页脚署名**。

当前附带的是官方 `2026.09.25` 版的 12px 比例模式（proportional）woff2：

- `fonts/ark-pixel-12px-proportional-latin.woff2`
- `fonts/ark-pixel-12px-proportional-zh-hans.woff2`

如需更新，去 [Releases](https://github.com/TakWolf/ark-pixel-font/releases) 下载 `...-12px-proportional-otf.woff2-*.zip` 覆盖同名文件即可（建议保持文件名不变）。

---

## 分类子页面

主页三个区块标题右侧的「显示更多」分别指向 `artworks.html`、`code.html`、`videos.html`：
主页按 `js/data.js` 里 `pageSize` 的数量显示，「显示更多」页则一次列出该分类的全部条目。

子页面与主页共用同一套 `css/style.css` 与 `js/main.js`，差异只写在 `<body>` 的三个属性上：

| 属性 | 作用 |
| --- | --- |
| `data-list="artworks"` | 指定本页统计的数据集合（用于显示「共 N 项」） |
| `data-show-all` | 不分页，一次渲染全部条目 |
| `data-title="全部画作"` | 浏览器标签页标题，主页不使用该属性 |

新增分类页时，复制任一子页面、改写这三个属性与对应的网格容器 `id` 即可。

### 预留空位

三个子页面尾部各留了 10 个空位，对应 `js/data.js` 里带 `slot: true` 的条目，
用来先把顺序占好，素材到位后再逐个填。

- 空位只在子页面出现（`home: false`），主页不显示；它们没有 `tags`，因此不参与筛选，
  也不会进入灯箱的翻页队列。
- 格子上的序号就是它在列表中的位置，与卡片编号一致，按顺序补图即可。
- 填入方法：把该条的 `src` 换成图片路径，补上 `title` / `tags` / `date` / `desc`，
  再删掉 `slot` 与 `home`，空位就变成普通作品。需要同时出现在主页时，`home` 也要删。
- 视频空位同理，另外补上 `poster`（封面）与 `src`（mp4 / webm）。

子页面顶部的计数会拆成「共 N 件 · 预留 M 个空位」；主页在该分类还没有真实作品时，
显示一条「内容整理中」的说明横幅，补上第一条作品后自动消失。

---

## 图片与缩略图

原图体积通常以 MB 计，而网格卡片只渲染几百像素，直接使用原图会让首屏等待明显变长。
因此每张展示用的图片有两条路径：

| 字段 | 使用场景 |
| --- | --- |
| `src` | 原图。灯箱、全屏放大只读取这一项，保证放大后是完整分辨率。 |
| `thumb` | 缩略图（长边 800px 的 WebP）。网格与头像只读取这一项。 |
| `thumbPos` | 可选。缩略图取景位置，写法同 CSS `object-position`，如 `"50% 20%"`。 |

`thumb` 省略时，对应位置会退回读取 `src`，功能不受影响，只是流量更大。

网格会把缩略图裁成方形（画作）或 16:9（代码截图），长图默认从正中取景。若画面重心不在中间，
在该条目上加 `thumbPos: "50% 20%"`（水平 垂直）即可指定保留哪一部分；不写则维持居中裁切。
这个设置只作用于网格，灯箱里始终是完整原图。

新增图片后运行一次脚本即可生成缩略图（需要 Pillow）：

```bash
python tools/make_thumbs.py           # 仅处理新增或已更新的源图
python tools/make_thumbs.py --force   # 全部重新生成
```

脚本扫描 `assets/artworks/` 与 `assets/avatar/`，把结果写到各自目录下的 `thumbs/`，
源文件不会被修改。脚本不会自动改写 `js/data.js`，新增条目时请按上面的规律补上 `thumb` 字段。

`assets/artworks/` 下的 SVG 与 `assets/code/` 的截图本身很小，无需生成缩略图。

### 原图转无损 WebP

灯箱读取的是 `src`，也就是原图。PNG 对插画的压缩率不高，二十张原图合计超过 90 MB；
转成无损 WebP 后像素完全不变，体积降到约六成。现在每张原图旁边都有一份同名 `.webp`，
`src` 指向的就是它，PNG 原文件仍保留在原处。

```bash
python tools/to_lossless_webp.py                        # 增量：只处理新增或已更新的源图
python tools/to_lossless_webp.py --verify               # 转换后解码回来逐像素比对
python tools/to_lossless_webp.py --force                # 全部重转
python tools/to_lossless_webp.py --dir assets/code      # 只处理某个目录
```

默认扫描 `assets/artworks/`、`assets/code/`、`assets/avatar/`，输出为同目录下的 `<原名>.webp`，
不修改也不删除源文件。两种情况下脚本会跳过并在输出里写明原因：WebP 反而更大（JPEG 已经是
有损压缩，无损重编码会把原有压缩痕迹一并保留，`6.jpg` 即属此类），以及边长超过 WebP 上限
16383 像素。压缩档位默认 `--method 4`，换成 `6` 只慢不省。

新增图片的流程变为：放进目录 → 跑一次本脚本 → 在 `js/data.js` 里把 `src` 写成 `.webp` 路径。
`thumb` 仍由 `make_thumbs.py` 从原图生成，两者互不影响。
