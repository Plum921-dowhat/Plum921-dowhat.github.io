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
├── tools/                辅助脚本（make_thumbs.py：生成缩略图）
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

---

## 图片与缩略图

原图体积通常以 MB 计，而网格卡片只渲染几百像素，直接使用原图会让首屏等待明显变长。
因此每张展示用的图片有两条路径：

| 字段 | 使用场景 |
| --- | --- |
| `src` | 原图。灯箱、全屏放大只读取这一项，保证放大后是完整分辨率。 |
| `thumb` | 缩略图（长边 800px 的 WebP）。网格与头像只读取这一项。 |

`thumb` 省略时，对应位置会退回读取 `src`，功能不受影响，只是流量更大。

新增图片后运行一次脚本即可生成缩略图（需要 Pillow）：

```bash
python tools/make_thumbs.py           # 仅处理新增或已更新的源图
python tools/make_thumbs.py --force   # 全部重新生成
```

脚本扫描 `assets/artworks/` 与 `assets/avatar/`，把结果写到各自目录下的 `thumbs/`，
源文件不会被修改。脚本不会自动改写 `js/data.js`，新增条目时请按上面的规律补上 `thumb` 字段。

`assets/artworks/` 下的 SVG 与 `assets/code/` 的截图本身很小，无需生成缩略图。
