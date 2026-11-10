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
     tags  : 会出现在筛选按钮里，现有取值：插画 / 同人 / oc / 线稿 / 稿件
     thumbPos : 缩略图取景位置，写法同 CSS 的 object-position，两个百分比表示「水平 垂直」。
             网格会把缩略图裁成方形（画作）或 16:9（代码截图），长图默认从正中取景，
             画面重心偏上时写 thumbPos: "50% 20%"，偏下写 "50% 80%"；
             只影响网格缩略图，灯箱里仍是完整原图。不写该字段即居中裁切。
     home  : 设为 false 时该条只在「画作画坊」子页面列出，主页不显示；
             不写该字段即视为参与主页展示
     数组顺序即展示顺序：主页与子页面都按此排列
  --------------------------------- */
  artworks: [
    /* ---- 主页展示的六幅：不带 home 字段即参与主页 ---- */
    { title: "Optimus Prime", src: "assets/artworks/Transformer.png", thumb: "assets/artworks/thumbs/Transformer.webp", tags: ["插画", "同人"], date: "2026", desc: "Transformer 抱了一只大猫。", thumbPos: "50% 50%" },
    { title: "Crush blacks", src: "assets/artworks/Transformer2.png", thumb: "assets/artworks/thumbs/Transformer2.webp", tags: ["插画", "同人"], date: "2026", desc: "看完《领袖之证》有感。", thumbPos: "10% 50%" },
    { title: "Drift x Ratchet", src: "assets/artworks/Transformer3.png", thumb: "assets/artworks/thumbs/Transformer3.webp", tags: ["插画", "同人"], date: "2026", desc: "尝试拼贴风，请支持《More Than Meet The Eyes》" },
    { title: "Christy", src: "assets/artworks/Christy.png", thumb: "assets/artworks/thumbs/Christy.webp", tags: ["插画", "oc"], date: "2026", desc: "尝试微鱼眼透视。" },
    { title: "“圣子”", src: "assets/artworks/3.png", thumb: "assets/artworks/thumbs/3.webp", tags: ["插画", "oc"], date: "2026", desc: "圣子和因他而死的人们", home: false },
    { title: "Clove", src: "assets/artworks/clove.png", thumb: "assets/artworks/thumbs/clove.webp", tags: ["插画", "同人"], date: "2026", desc: "尝试重色和其他配色", thumbPos: "75% 50%" },

    /* ---- 以下作品只在「画作画坊」子页面列出（home: false），主页仍只放上面六幅 ----
       排列顺序：Transformers 线稿 → 约稿稿件 → 数字序号彩插 → 预留空位 */
   
    /* 约稿稿件 */
    { title: "稿件1", src: "assets/artworks/commission1.png", thumb: "assets/artworks/thumbs/commission1.webp", tags: ["稿件", "线稿"], date: "2025", desc: "我 超 级 喜 欢 这 张。", thumbPos: "50% 10%", home: false },
    { title: "稿件2", src: "assets/artworks/commission2.png", thumb: "assets/artworks/thumbs/commission2.webp", tags: ["稿件", "线稿"], date: "2025", desc: "接稿期画的最后一张。", thumbPos: "50% 10%", home: false },
    { title: "稿件3", src: "assets/artworks/commission3.png", thumb: "assets/artworks/thumbs/commission3.webp", tags: ["稿件"], date: "2025", desc: "画得最超常发挥并且很顺利的一张。", thumbPos: "50% 10%", home: false },
    { title: "稿件4", src: "assets/artworks/commission4.png", thumb: "assets/artworks/thumbs/commission4.webp", tags: ["稿件"], date: "2025", desc: "我一开始最喜欢的一张。", thumbPos: "50% 10%", home: false },

    /* 数字序号命名的彩插：按序号排在真实作品末尾 */
    { title: "Orchid-sir", src: "assets/artworks/Orchid-sir.png", thumb: "assets/artworks/thumbs/Orchid-sir.webp", tags: ["插画", "oc"], date: "2025", desc: "打光尝试。bgm:《Drown Out The Noise》" },
    { title: "被束缚的", src: "assets/artworks/1.png", thumb: "assets/artworks/thumbs/1.webp", tags: ["插画", "oc"], date: "2025", desc: "第一张半身插。", thumbPos: "50% 10%", home: false },
    { title: "绫", src: "assets/artworks/2.png", thumb: "assets/artworks/thumbs/2.webp", tags: ["插画", "oc"], date: "2024", desc: "世界观下的神秘产物。", thumbPos: "50% 10%", home: false },
    { title: "万圣节", src: "assets/artworks/4.png", thumb: "assets/artworks/thumbs/4.webp", tags: ["插画", "oc"], date: "2024", desc: "万圣节贺图，和原图差异很大。", thumbPos: "50% 15%", home: false },
    { title: "弓的肖像", src: "assets/artworks/5.png", thumb: "assets/artworks/thumbs/5.webp", tags: ["oc"], date: "2024", desc: "尝试了一些画法。", home: false },
    { title: "小头像", src: "assets/artworks/6.jpg", thumb: "assets/artworks/thumbs/6.webp", tags: ["oc"], date: "2023", desc: "以前一直用的小头像", home: false },

    { title: "线稿+1", src: "assets/artworks/BLACK (1).png", thumb: "assets/artworks/thumbs/BLACK (1).webp", tags: ["线稿"], date: "2026", desc: "无，只是展示线稿。", thumbPos: "50% 15%", home: false },
    { title: "线稿+1", src: "assets/artworks/BLACK (2).png", thumb: "assets/artworks/thumbs/BLACK (2).webp", tags: ["线稿"], date: "2026", desc: "无，只是展示线稿。", thumbPos: "50% 40%", home: false },
    { title: "线稿+1", src: "assets/artworks/BLACK (3).png", thumb: "assets/artworks/thumbs/BLACK (3).webp", tags: ["线稿"], date: "2026", desc: "无，只是展示线稿。", home: false },
    { title: "线稿+1", src: "assets/artworks/BLACK (4).png", thumb: "assets/artworks/thumbs/BLACK (4).webp", tags: ["线稿"], date: "2026", desc: "无，只是展示线稿。", home: false },

    /* ---- 子页面预留空位：10 个，只在 artworks.html 出现 ----
       这十条是「还没画好」的空格子，占好位、编好号，等素材到位再填。
       填入方法：把 src 换成图片路径，补上 title / tags / date / desc，
       然后删掉这一行的 slot 与 home，它就成了普通作品（删 home 才会同步出现在主页）。
       空位不参与筛选，也不会出现在主页，因此不需要给它们填 tags。 */
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false }
  ],

  /* ---------- 4. 代码截图 / 动图 ----------
     字段同画作：src 原图、thumb 缩略图（网格读这一项）、link 项目地址（可留空）。
     下面十条同样是 code.html 的预留空位，填入方法与画作一致：
     补好 src / title / tags / desc，再删掉 slot 与 home 即可。
  --------------------------------- */
  codeDemos: [
    { title: "爬虫结果看板", src: "assets/code/Snipaste_2026-11-08_01-08-20.png", tags: ["Web", "数据"], date: "2026", desc: "爬虫管道的统计看板，爬虫主要抓取 dev 技术平台文章。", link: "" },
    { title: "Evil Words 首页", src: "assets/code/Snipaste_2026-11-09_09-16-09.png", tags: ["Web", "工具"], date: "2026", desc: "基于 SM-2 间隔重复的英语学习平台，我在首页添加了热力图。", link: "" },
    { title: "Evil Words 词库", src: "assets/code/Snipaste_2026-11-09_09-16-28.png", tags: ["Web", "工具"], date: "2026", desc: "数据库存储的其中一份词库列表，这个会作为基础数据库存在应用后台。", link: "", home: false },
    { title: "Algoscope 排序预览", src: "assets/code/Snipaste_2026-11-10_14-09-44.png", tags: ["Web", "工具"], date: "2026", desc: "排序过程可视化：便于学习者理解算法原理。", link: "" },
    { title: "Algoscope内页复杂度对比总表", src: "assets/code/Snipaste_2026-11-10_14-51-24.png", tags: ["Web", "数据"], date: "2026", desc: "供我自己学习制作，包含程序内已有的所有算法复杂度。", link: "", home: false },
    { title: "Nexus-RAG知识检索库", src: "assets/code/Snipaste_2026-11-10_15-01-36.png", tags: ["Web", "工具"], date: "2026", desc: "文档经 Redis Stream 异步切片入库，用于知识管理与检索。", link: "" },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false }
  ],

  /* ---------- 5. 视频演示 ----------
     src    : 视频文件（mp4/webm）。留空 "" 时显示"待上传"占位。
     poster : 封面图。留空会自动用占位图。
     下面十条是 videos.html 的预留空位，填入方法同上：
     补好 src 与 poster，再删掉 slot 与 home 即可。
  --------------------------------- */
  videos: [
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false },
    { slot: true, title: "待填入", src: "", home: false }
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
