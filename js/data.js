/* =========================================================
   PLUM921 · 站点内容配置
   ---------------------------------------------------------
   ★ 你以后只需要改这个文件 ★
   图片/视频文件放进 assets/ 对应目录，然后在这里填相对路径。
   路径写错或文件不存在时，页面会自动回退到占位图，不会白屏。
   ========================================================= */

window.SITE_DATA = {

  /* ---------- 0. 每区首屏显示数量（没有硬性上限，只是分页大小） ----------
     数组里的条目超过这个数时，底部会出现「加载更多」按钮；
     想一页全显示就把数字改大（比如 999）或设为 0 表示不分页。 */
  pageSize: {
    artworks: 12,   // 画作
    codeDemos: 8,   // 代码截图 / 动图
    videos: 4       // 视频演示
  },

  /* ---------- 1. 基本信息 ---------- */
  profile: {
    name: "PLUM921",
    role: "画画 / 写代码 / 做些小玩意",
    intro: "这里是黄时，个人主页兼顾画作和代码作品，目前还在制作中，其他内容后面会陆续加入。",
    avatar: "assets/avatar/image.png",   // 【替换】换成 assets/avatar/头像.png
    avatarThumb: "assets/avatar/thumbs/image.webp",  // 头像缩略图，由 tools/make_thumbs.py 生成；省略时退回 avatar
    footerName: "黄时PLUM",// 头像下方的名字
    // 顶部横幅（建议 480×60 或更宽的低分辨率横构图像素图，页面全宽铺满）
    banner: "assets/banner/orchard-480x60.png",       // 【替换】换成你自己的图
    bannerAlt: "风景",// 横幅的 alt 属性
    bannerCap: "ORCHARD",                   // 横幅下沿的说明文字
    bannerMeta: "480 × 60 px",

    // 终端窗口里的文字，逐行显示。可用 <span class="t-red"> 与 <span class="t-dim"> 上色。
    terminal: [
      '$ whoami',
      '<span class="t-red">plum921</span>',
      '$ cat interests.txt',
      '<span class="t-dim">// 画画、代码、像素、独游</span>',
      '$ ls ./works',
      '<span class="t-dim">artworks/  code-demos/  videos/</span>',
      '$ status --now',
      '装修中…… 欢迎随便逛逛 <span class="t-red">_</span>'
    ],

    // 顶部跑马灯文案
    ticker: [
      "祝你阅览愉快",
      "ART & CODE",
      "Plum",
      "正在持续更新中",
      "THANKS FOR VISITING",
      "迎接清晨，和余生的每一天",
      "祝你阅览愉快",
      "ART & CODE",
      "Plum",
      "正在持续更新中",
      "THANKS FOR VISITING",
      "迎接清晨，和余生的每一天"
    ]
  },

  /* ---------- 2. 社交链接（增删都可以，href 填 # 时表示还没填） ---------- */
  links: [
    { label: "GitHub",  href: "https://github.com/Plum921-dowhat" },
    { label: "Bilibili", href: "#" },
    { label: "lofter",   href: "#" },
    { label: "Email",   href: "mailto:huangshiplum123456@gmail.com" }
  ],

  /* ---------- 3. 画作 ----------
     src   : 原图路径（建议放进 assets/artworks/），灯箱与全屏只读取这一项
     thumb : 网格缩略图路径，由 tools/make_thumbs.py 生成；省略时网格退回读取 src
     tags  : 会出现在筛选按钮里
     thumbPos : 缩略图取景位置，写法同 CSS 的 object-position，两个百分比表示「水平 垂直」。
             网格会把缩略图裁成方形（画作）或 16:9（代码截图），长图默认从正中取景，
             画面重心偏上时写 thumbPos: "50% 20%"，偏下写 "50% 80%"；
             只影响网格缩略图，灯箱里仍是完整原图。不写该字段即居中裁切。
     home  : 设为 false 时该条只在「画作画坊」子页面列出，主页不显示；
             不写该字段即视为参与主页展示
     数组顺序即展示顺序：主页与子页面都按此排列
  --------------------------------- */
  artworks: [
    { title: "Optimus Prime", src: "assets/artworks/Transformer.png", thumb: "assets/artworks/thumbs/Transformer.webp", tags: ["插画", "同人"], date: "2026", desc: "Transformer 抱了一只大猫。",thumbPos: "50% 50%"},
    { title: "Crush blacks", src: "assets/artworks/Transformer2.png", thumb: "assets/artworks/thumbs/Transformer2.webp", tags: ["插画", "同人"], date: "2026", desc: "看完《领袖之证》有感。" ,thumbPos: "10% 50%"},
    { title: "Drift x Ratchet", src: "assets/artworks/Transformer3.png", thumb: "assets/artworks/thumbs/Transformer3.webp", tags: ["插画", "同人"], date: "2026", desc: "尝试拼贴风，请支持《More Than Meet The Eyes》" },
    { title: "Christy", src: "assets/artworks/Christy.png", thumb: "assets/artworks/thumbs/Christy.webp", tags: ["插画", "oc"], date: "2026", desc: "尝试微鱼眼透视。" },
    { title: "Orchid-sir", src: "assets/artworks/Orchid-sir.png", thumb: "assets/artworks/thumbs/Orchid-sir.webp", tags: ["插画", "oc"], date: "2026", desc: "打光尝试。bgm:《Drown Out The Noise》" },
    { title: "Clove", src: "assets/artworks/clove.png", thumb: "assets/artworks/thumbs/clove.webp", tags: ["插画", "同人"], date: "2026", desc: "尝试重色和其他配色", thumbPos: "75% 50%" },

    /* 以下为模板自带的占位条目：仅出现在画作子页面，主页不列出。
       替换成自己的作品时，删掉 home 字段即可同步显示在主页。 */
    { title: "作品 02", src: "assets/artworks/art-02.svg", tags: ["像素画"], date: "2026", desc: "占位内容，替换成你自己的画。", home: false },
    { title: "作品 04", src: "assets/artworks/art-04.svg", tags: ["草图"], date: "2026", desc: "占位内容，替换成你自己的画。", home: false },
    { title: "作品 05", src: "assets/artworks/art-05.svg", tags: ["oc"], date: "2026", desc: "占位内容，替换成你自己的画。", home: false },
    { title: "作品 06", src: "assets/artworks/art-06.svg", tags: ["草图"], date: "2026", desc: "占位内容，替换成你自己的画。", home: false }
  ],

  /* ---------- 4. 代码截图 / 动图 ---------- */
  codeDemos: [
    { title: "项目 01", src: "assets/code/code-01.svg", tags: ["Web"], date: "2026", desc: "项目简介写这里。", link: "" },
    { title: "项目 02", src: "assets/code/code-02.svg", tags: ["工具"], date: "2026", desc: "项目简介写这里。", link: "" },
    { title: "项目 03", src: "assets/code/code-03.svg", tags: ["实验"], date: "2026", desc: "项目简介写这里。", link: "" },
    { title: "项目 04", src: "assets/code/code-04.svg", tags: ["Web"], date: "2026", desc: "项目简介写这里。", link: "" }
  ],

  /* ---------- 5. 视频演示 ----------
     src    : 视频文件（mp4/webm）。留空 "" 时显示"待上传"占位。
     poster : 封面图。留空会自动用占位图。
  --------------------------------- */
  videos: [
    { title: "视频演示 01", src: "", poster: "assets/video/poster-01.svg", date: "", desc: "放一段录屏或动效演示，支持 mp4 / webm。" },
    { title: "视频演示 02", src: "", poster: "assets/video/poster-02.svg", date: "", desc: "在此填充并上传视频。" }
  ],

  /* ---------- 6. 关于页 ---------- */
  about: [
    "你好，很高兴认识你 —— 网站内容为个人自我介绍和作品展示。",
    "这个站点主要用来存放作品与实验，其本身也是实验内容，正在慢慢更新中。"
  ],
  stats: [
    { num: "8",  label: "年的画画经历" },
    { num: "若干",  label: "项目经验" },
    { num: "∞",  label: "在学的东西" },
    { num: "200", label: "余额" }
  ],
  skills: ["Photoshop", "Procreate", "JavaScript", "Python", "Unity", "Blender"]
};
