export type ProjectStatus = 'Active' | 'Maintained' | 'Paused' | 'Archived'

export type TimelineItem = {
  year: string
  title: string
  description: string
  tags?: string[]
}

export type Project = {
  slug: string
  name: string
  problem: string
  role: string
  stars?: string
  badge?: string
  openSource?: boolean
  cover?: { src: string; alt?: string }
  images?: { src: string; alt?: string }[]
  stack: string[]
  status: ProjectStatus
  highlights?: string[]
  links?: { label: string; href: string }[]
}

export const siteInfo = {
  name: '羊先生',
  title: '前端工程师 × AI 工具构建者',
  tagline: '专注复杂业务系统、工程化与 AI 实践落地',
  email: '470193837@qq.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/hangjob' },
    { label: '博客', href: 'https://www.vipbic.com/' },
  ],
} as const

export const capabilityOverview = [
  {
    title: '复杂业务交付',
    description: '从需求到上线，注重可维护性与可演进的系统设计。',
  },
  {
    title: '工程化与质量',
    description: '构建、规范、测试、监控，保证稳定交付与团队效率。',
  },
  {
    title: '性能与体验',
    description: '以数据驱动优化加载、渲染与交互，减少用户等待。',
  },
  {
    title: 'AI 工具实践',
    description: '将 AI 融入研发流程，提升产出与一致性。',
  },
] as const

const svgCover = (title: string, subtitle: string, palette: 1 | 2 | 3 = 1) => {
  const palettes = {
    1: { a: '#4f46e5', b: '#0ea5e9', c: '#0b1220' },
    2: { a: '#22d3ee', b: '#6366f1', c: '#081226' },
    3: { a: '#10b981', b: '#22d3ee', c: '#071a18' },
  } as const

  const { a, b, c } = palettes[palette]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${b}" stop-opacity="0.92"/>
    </linearGradient>
    <radialGradient id="r" cx="0.2" cy="0.1" r="1.1">
      <stop offset="0" stop-color="${a}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${c}" stop-opacity="0"/>
    </radialGradient>
    <filter id="n" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .05 0" result="colored"/>
      <feBlend in="SourceGraphic" in2="colored" mode="overlay"/>
    </filter>
  </defs>
  <rect width="1200" height="760" fill="${c}"/>
  <rect width="1200" height="760" fill="url(#r)"/>
  <rect x="-120" y="-120" width="1440" height="1000" rx="64" fill="url(#g)" opacity="0.28"/>
  <g opacity="0.18" stroke="#ffffff">
    <path d="M0 112h1200"/>
    <path d="M0 236h1200"/>
    <path d="M0 360h1200"/>
    <path d="M0 484h1200"/>
    <path d="M0 608h1200"/>
    <path d="M120 0v760"/>
    <path d="M300 0v760"/>
    <path d="M480 0v760"/>
    <path d="M660 0v760"/>
    <path d="M840 0v760"/>
    <path d="M1020 0v760"/>
  </g>
  <g filter="url(#n)">
    <circle cx="980" cy="140" r="220" fill="${b}" opacity="0.18"/>
    <circle cx="240" cy="620" r="260" fill="${a}" opacity="0.14"/>
  </g>
  <g fill="#ffffff">
    <text x="86" y="360" font-size="52" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-weight="800" letter-spacing="0.5">${title}</text>
    <text x="86" y="414" font-size="22" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-weight="600" opacity="0.86">${subtitle}</text>
  </g>
  <g opacity="0.35" fill="#ffffff">
    <text x="86" y="468" font-size="13" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas" letter-spacing="2">PROJECT</text>
  </g>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const journeyTimeline: TimelineItem[] = [
  {
    year: '2017',
    title: '博客系统的萌芽：从 PHP 到 Vue',
    description: '接触 PHP / MySQL 后，萌生了记录问题的想法。初期使用 Photoshop 设计网站，基于 thinkPHP 3.0 开发后台，FastAdmin 提供管理界面（虽然当时不太流畅），前端尝试 Vue + jQuery 混合开发，开启了全栈探索之路。',
    tags: ['PHP', 'MySQL', 'thinkPHP 3.0', 'Vue', 'jQuery'],
  },
  {
    year: '2018',
    title: '开源与重构：追求极致体验',
    description: '博客用户量增长，为了追求更流畅的体验，放弃了 FastAdmin，尝试 Tpt-Content 开源系统并进行深度改造（改得面目全非）。最终基于 thinkPHP 5.0 的轻量架构，实现了部分后台渲染与 API 接口调用的混合模式，注重界面与交互体验。',
    tags: ['thinkPHP 5.0', '重构', '体验优化'],
  },
  {
    year: '2019',
    title: '前后端分离与 Docker 初体验',
    description: '日 PV 上升至 50+，总刷新量破 70万，百度收录 6000+。决定全面重构：前端升级为 Vue 2.0 + Webpack 4 多页面架构，后台采用 thinkPHP 5.0 + layui，首次引入 Docker 容器化部署与 Nginx 反向代理，虽然折腾但收获满满。',
    tags: ['Vue 2.0', 'Webpack 4', 'Docker', 'Nginx', 'thinkPHP 5.0'],
  },
  {
    year: '2020',
    title: '全栈导航与架构升级',
    description: '年初发布第一版全栈导航（thinkPHP 5 + Vue），虽 SEO 友好但开发效率低。10 月再次重构，拥抱 Nuxt.js + thinkPHP 6，引入 Redis 缓存替代文件缓存，服务器全面可视化管理，系统流畅度大幅提升。',
    tags: ['Nuxt.js', 'thinkPHP 6', 'Redis', '全栈导航'],
  },
  {
    year: '2021',
    title: '企业级工程化与 Vue 3.0 实践',
    description: '侧重前端工程化，从 0 到 1 搭建 PM-UI 框架与工程模板（Gulp 4 + Webpack 4）。下半年全面拥抱 TypeScript + Vue 3.0 + Vite 2.6，结合 Ant Design Vue 开发企业级中后台，Webstorm + TS 的开发体验让人欲罢不能。',
    tags: ['Vue 3.0', 'TypeScript', 'Vite', '工程化', 'PM-UI'],
  },
  {
    year: '2022',
    title: '基础设施与微前端探索',
    description: '晋升前端主管，专注于 pm-utils 工具库建设与 Vue-Bag-Admin 管理系统框架开发（Vite 3 + Pinia + Egg.js）。在微前端领域，基于无界（WebComponent + iframe）搭建基础底座，探索乾坤、飞冰等主流方案，提升团队协作效率。',
    tags: ['微前端', 'Vue-Bag-Admin', 'Egg.js', '工具库'],
  },
  {
    year: '2023',
    title: '框架迭代与 Nuxt 3 全新架构',
    description: '公司框架升级至 6.0，解决历史遗留问题并统一 pnpm 管理。个人重构 Vue-Bag-Admin（Vite 4 + Naive UI），开发 Egg-Bag-Framework 后端框架。年底基于 Nuxt 3.8 + Egg.js + Node.js 重构整站，获得掘金优秀创作者称号，GitHub 项目 star 破千。',
    tags: ['Nuxt 3', 'Naive UI', 'pnpm', 'Egg-Bag-Framework', '荣誉'],
  },
  {
    year: '2024',
    title: '插件化开发与客户端跨界',
    description: 'Vue-Bag-Admin 升级 Vite 5.2，推行插件化开发模式，解决代码复用与维护难题。推出 Vue-Web-Template 统一开发规范。跨界 Electron 开发“知航驿站”客户端。上线生活记录网站，坚持健身打卡 320+ 天。',
    tags: ['Vite 5', '插件化', 'Electron', 'Vue-Web-Template', '生活记录'],
  },
]

export const aboutMotto = [
  '曾经有人问我，你是怎么坚持下来的？',
  '终有一天，你会明白，能找到自己喜欢的东西，并保持热爱，是多么的幸运，一辈子转瞬即逝，至少活的有态度些。',
  '前路坎坷，我辈当不忘初心，愿你出走半生，归来仍是少年！',
  '2025 待更新…',
] as const

export const otherWorks = [
  {
    name: '全栈导航',
    href: 'https://www.itnavs.com/',
    description: '专注分享产品、设计、前后端开发资源的优质导航网站。',
  },
  {
    name: 'vipbic 综合站点',
    href: 'https://www.vipbic.com/',
    description: '集前端开发、导航、社区、资源下载于一体的综合性平台。',
  },
  {
    name: '海栈',
    href: 'https://www.haiwb.com/',
    description: '挖掘互联网优质资源与工具的快捷入口集合。',
  },
  {
    name: '我的相册',
    href: 'https://hi.vipbic.com/',
    description: '记录日常生活点滴，分享美好瞬间。',
  },
  {
    name: 'Bag 后台管理系统',
    href: 'https://vite.itnavs.com/',
    description: '基于 Vite + Vue 3 的企业级中后台响应式管理框架。',
  },
  {
    name: '生活网站',
    href: 'https://life.itnavs.com/',
    description: '记录每天的生活与坚持，分享健身与成长。',
  },
] as const

export const projects: Project[] = [
  {
    slug: 'unibest',
    name: 'unibest',
    stars: '600+',
    problem: '最好用的 uniapp 开发模板。',
    role: '核心开发者，打造极致的 uniapp 开发体验。',
    openSource: true,
    cover: {
      src: svgCover('unibest', 'uniapp / Vue 3 / Vite 5', 1),
      alt: 'unibest',
    },
    images: [
      { src: svgCover('极致开发体验', 'VS Code / TypeScript / UnoCSS', 1), alt: '极致开发体验' },
      { src: svgCover('全功能集成', 'Layout / Request / Router', 2), alt: '全功能集成' },
      { src: svgCover('多端统一', 'Web / 小程序 / App', 3), alt: '多端统一' },
    ],
    stack: ['uniapp', 'Vue 3', 'TypeScript', 'Vite', 'UnoCSS', 'wot-ui', 'z-paging'],
    status: 'Active',
    highlights: [
      '600+ stars，社区活跃',
      '无需 HBuilderX，VS Code 开发体验更佳',
      '内置约定式路由、Layout 布局、请求封装',
      '多端支持：Web、小程序、App',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/unibest-tech/unibest' },
      { label: '文档', href: 'https://codercup.github.io/unibest-docs/' },
    ],
  },
  {
    slug: 'vipbic-platform',
    name: 'Vipbic 综合社区平台',
    stars: '1.5w+ 粉丝',
    badge: '建站10年',
    problem: '构建一个集技术分享、工具导航、在线实验室与社区交流于一体的综合性平台，解决开发者资源分散的问题。',
    role: '全栈独立开发与运营，负责从设计到部署的全流程。',
    openSource: false,
    cover: {
      src: svgCover('综合社区平台', 'BBS / 导航 / 实验室 / 工具集', 1),
      alt: 'Vipbic 综合社区平台',
    },
    images: [
      { src: svgCover('多模块集成', '社区 · 导航 · 实验室', 1), alt: '多模块集成' },
      { src: svgCover('微前端实践', 'Micro App 架构探索', 2), alt: '微前端实践' },
      { src: svgCover('丰富交互', '编辑器 · 图表 · 动画', 3), alt: '丰富交互' },
    ],
    stack: ['Vue 2', 'iView', 'ECharts', 'Node.js', 'Webpack', 'Less'],
    status: 'Active',
    highlights: [
      '多模块集成：包含技术社区(BBS)、资源导航、在线实验室与工具集',
      '微前端架构探索：基于 src/views/micro 的微前端实践',
      '丰富的交互组件：集成 Markdown 编辑器、图表可视化与多种 Loader 动画',
      '移动端适配：基于 flexible + px2rem 的响应式方案',
    ],
    links: [
      { label: '官网', href: 'https://www.vipbic.com/' },
    ],
  },
  {
    slug: 'vue-bag-admin',
    name: 'Vue-Bag-Admin',
    stars: '1300+',
    problem:
      '提供开箱即用的 Vue 中后台管理系统框架，让开发者以更小成本完成管理端开发与扩展。',
    role: '发起并维护开源项目，负责核心架构、插件式扩展能力、文档与示例落地。',
    openSource: true,
    cover: {
      src: 'https://opengraph.githubassets.com/1/hangjob/vue-bag-admin',
      alt: 'Vue-Bag-Admin',
    },
    images: [
      { src: 'https://opengraph.githubassets.com/1/hangjob/vue-bag-admin', alt: 'Vue-Bag-Admin' },
      { src: svgCover('插件式扩展', '不改源码即可持续演进', 2), alt: '插件式扩展' },
      { src: svgCover('响应式中后台', 'PC / iPad / Mobile 统一体验', 1), alt: '响应式中后台' },
      { src: svgCover('工程化交付', '规范、质量与可维护性优先', 3), alt: '工程化交付' },
    ],
    stack: ['Vue 3', 'Vite 5', 'Naive UI', 'JavaScript', 'Pinia', 'Tailwind CSS', 'Strapi', 'MySQL'],
    status: 'Active',
    highlights: [
      '响应式适配：PC / iPad / Mobile',
      '插件式开发：不修改原代码即可扩展功能',
      '内置能力：权限、多语言、主题切换、页面缓存、动态路由等',
      'API 服务：Strapi 无头 CMS，支持 GraphQL 与颗粒度权限拦截',
      'MIT 协议：免费开源、可商用',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/hangjob/vue-bag-admin' },
      { label: 'README', href: 'https://github.com/hangjob/vue-bag-admin#readme' },
    ],
  },
  {
    slug: 'vue-admin',
    name: 'vue-admin',
    stars: '300+',
    badge: '2018年开源',
    problem:
      '提供一份完整的前端项目基础配置项，可用于 PC 网站、移动端网页与后台管理系统，降低工程化重复配置成本。',
    role: '开源启蒙之作，让我对开源产生了乐趣。沉淀并维护工程化配置模板，持续更新构建与开发体验相关能力。',
    openSource: true,
    cover: {
      src: 'https://opengraph.githubassets.com/1/hangjob/vue-admin',
      alt: 'vue-admin',
    },
    images: [
      { src: 'https://opengraph.githubassets.com/1/hangjob/vue-admin', alt: 'vue-admin' },
      { src: svgCover('基础工程模板', '一套配置覆盖多类前端项目', 1), alt: '基础工程模板' },
      { src: svgCover('构建与性能', '预加载 / CDN / 压缩等策略集', 2), alt: '构建与性能' },
    ],
    stack: ['Vue', 'Vue CLI 3', 'Vite 3', 'Webpack', 'JavaScript', 'Axios', 'Less'],
    status: 'Maintained',
    highlights: [
      '配置 CDN（JS/CSS）与预加载策略',
      '开启 Gzip 压缩（JS/CSS），并支持去注释/去 console',
      '图片压缩、本地代理、别名与多环境变量（dev/test/prod）',
      '支持动态路由注入、Axios 封装、Mock 数据与打包分析',
      '适配 px→rem 等移动端常用方案',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/hangjob/vue-admin' },
      { label: 'README', href: 'https://github.com/hangjob/vue-admin#readme' },
    ],
  },
  {
    slug: 'pm-utils',
    name: 'PM Utils 核心工具库',
    badge: '效率提升 200%',
    problem: '统一封装复杂的 CA 驱动调用，避免全员重复对接，内置大量常用业务工具，显著降低开发成本。',
    role: '核心开发者。通过标准化封装多省份 CA 驱动与通用函数，实现“一次接入，到处使用”，团队开发效率提升 200%。',
    openSource: false,
    cover: {
      src: svgCover('企业级工具库', 'CA / 信创 / 加密 / 兼容性', 3),
      alt: 'PM Utils',
    },
    images: [
      { src: svgCover('CA 驱动集成', '多省份/多厂商统一调用', 1), alt: 'CA 驱动集成' },
      { src: svgCover('信创与兼容', 'IE / Chrome / 国产浏览器适配', 2), alt: '信创与兼容' },
      { src: svgCover('功能模块', 'Crypto / File / Date / Regex', 3), alt: '功能模块' },
    ],
    stack: ['TypeScript', 'Vue 3', 'Vite', 'VitePress', 'CryptoJS'],
    status: 'Active',
    highlights: [
      '多省份 CA 驱动统一封装：覆盖安徽、河南、湖北、浙江等地的互认与签章',
      '信创环境适配：通过 multibrowser.js 实现非 IE 环境下的硬件交互',
      '全功能工具集：集成加密、文件压缩、正则校验等高频业务函数',
      '完善的文档体系：基于 VitePress 构建的实时交互文档',
    ],
    links: [],
  },
  {
    slug: 'pm-apss',
    name: 'PM综合管理平台',
    badge: 'Tauri + Turborepo',
    problem: '构建基于 Turborepo 的企业级应用生态，整合 Strapi Headless CMS 与 Tauri 桌面端应用，实现前后端一体化交付。',
    role: '架构设计与核心开发。首次采用 Turborepo 架构管理 Monorepo，使用 Tauri 构建轻量级前端管理工具，打通 API 服务与桌面端交互链路。',
    openSource: false,
    cover: {
      src: svgCover('Monorepo 架构', 'Turborepo / Strapi / Tauri', 2),
      alt: 'PM综合管理平台',
    },
    images: [
      { src: svgCover('API 服务端', 'Strapi 5 / Socket.IO / MySQL', 1), alt: 'API 服务端' },
      { src: svgCover('桌面客户端', 'Tauri 2 / Vue 3 / Naive UI', 3), alt: '桌面客户端' },
      { src: svgCover('AI 辅助集成', 'OpenAI / 智能问答 / 自动化', 2), alt: 'AI 辅助集成' },
    ],
    stack: ['Turborepo', 'Tauri 2', 'Strapi 5', 'Vue 3', 'Rust', 'Socket.IO'],
    status: 'Active',
    highlights: [
      'Monorepo 架构：基于 Turborepo 管理 API 服务与客户端应用',
      'API 服务端：Strapi 5 + Socket.IO 实现实时通讯与内容管理',
      '跨平台桌面端：Tauri 2 + Vue 3 构建高性能本地应用',
      '智能化集成：内置 AI 助手与自动化工作流',
    ],
    links: [],
  },
  {
    slug: 'pm-web-design',
    name: 'PM Web Design 一体化框架',
    badge: '无界微前端 + 一体化',
    problem: '基于企业部真实业务场景打造，集成无界微前端技术，解决多系统割裂与部署维护难题。',
    role: '架构设计与核心开发。实现“一套代码集成、无缝切换”，极大地简化了部署流程，提升了用户体验。',
    openSource: false,
    cover: {
      src: svgCover('一体化框架', 'Wujie / BPMN / LowCode', 1),
      alt: 'PM Web Design',
    },
    images: [
      { src: svgCover('微前端集成', '无界 Wujie / 子应用融合', 2), alt: '微前端集成' },
      { src: svgCover('工作流引擎', 'BPMN.js / Activiti / 流程设计', 2), alt: '工作流引擎' },
      { src: svgCover('动态表单', '可视化拖拽 / JSON 驱动', 1), alt: '动态表单' },
    ],
    stack: ['Vue 2', 'Wujie', 'Element UI', 'BPMN.js', 'Webpack'],
    status: 'Maintained',
    highlights: [
      '微前端架构：集成无界（Wujie）方案，实现多子系统无缝融合与切换',
      '一体化交付：一套代码即可集成所有业务模块，部署维护极其方便',
      '可视化流程设计：集成 BPMN.js 实现 Activiti/Flowable 流程设计器',
      '动态表单引擎：支持可视化拖拽设计与 JSON 渲染',
    ],
    links: [],
  },
  {
    slug: 'pm-ui',
    name: 'UI 组件库',
    badge: 'UI库 + 脚手架构建',
    problem: '提供一套基于 Vue 2 的标准化 UI 组件库，解决业务开发中风格不统一、重复造轮子的问题。',
    role: '核心开发者。通过本项目掌握了 UI 库与脚手架的从 0 到 1 构建流程，实现了企业级标准化 UI 库的开发与落地。',
    openSource: false,
    cover: {
      src: svgCover('企业级组件库', 'Vue 2 / Gulp / Unit Test', 2),
      alt: 'UI 组件库',
    },
    images: [
      { src: svgCover('组件体系', 'Button / Card / Timeline / Layout', 1), alt: '组件体系' },
      { src: svgCover('文档中心', 'Markdown 渲染 / 交互式 Demo', 3), alt: '文档中心' },
      { src: svgCover('工程化', 'Gulp 打包 / Jest 测试 / ESLint', 2), alt: '工程化' },
    ],
    stack: ['Vue 2', 'Gulp', 'Jest', 'Less', 'Markdown-it'],
    status: 'Maintained',
    highlights: [
      '标准化组件体系：包含 20+ 常用业务组件，覆盖布局、数据展示、交互反馈等场景',
      '自动化构建流程：结合 Gulp 与 Webpack 实现组件分离打包与样式处理',
      '文档驱动开发：内置 Markdown 解析器，支持代码实时演示与 API 文档生成',
      '单元测试覆盖：基于 Jest 实现核心组件测试，保障库的稳定性',
    ],
    links: [],
  },
  {
    slug: 'pm-monitoring-sdk',
    name: 'PM 监控 SDK',
    badge: '离线回放 + 实时调试',
    problem: '基于 PageSpy 开源部署，构建全平台兼容的前端监控 SDK，解决线上问题复现难、调试难的痛点。',
    role: '核心开发者。实现了在线实时调试与离线日志回放功能，支持 Web、小程序、App 等多端接入，大幅提升问题排查效率。',
    openSource: false,
    cover: {
      src: svgCover('前端监控 SDK', 'PageSpy / Debug / Replay', 3),
      alt: 'PM 监控 SDK',
    },
    images: [
      { src: svgCover('多端支持', 'Web / H5 / 小程序 / App', 1), alt: '多端支持' },
      { src: svgCover('实时调试', 'Console / Network / Storage', 2), alt: '实时调试' },
      { src: svgCover('离线回放', 'rrweb 录屏 / 日志回放', 3), alt: '离线回放' },
    ],
    stack: ['Vue 3', 'PageSpy', 'Vite', 'rrweb', 'Tailwind CSS'],
    status: 'Active',
    highlights: [
      '多端支持：完美适配 Web、H5、小程序及 App，实现全平台监控覆盖',
      '在线实时调试：基于 PageSpy 实现远程连接，实时查看 Console、Network 与 Storage',
      '离线日志回放：支持用户行为录屏（rrweb）与操作日志的离线回放',
      '异常精准捕获：全方位采集 JS Error、请求报错与性能指标',
    ],
    links: [],
  },
  {
    slug: 'bag-strapi-plugin',
    name: 'Bag Strapi 5 增强插件',
    badge: 'Strapi 5 二开 + 企业级集成',
    problem: '解决 Strapi 5 原生功能在企业级场景下的缺失，提供开箱即用的安全性、内容管理与运营工具。',
    role: '核心开发者。基于 Strapi 5 进行深度二次开发，打造了一套可快速集成的企业级完整工作流，显著降低了交付成本。',
    openSource: true,
    cover: {
      src: svgCover('Strapi 5 Plugin', 'Security / CMS / Operation', 1),
      alt: 'Bag Strapi Plugin',
    },
    images: [
      { src: svgCover('安全加固', 'IP 限制 / RSA 加密 / 验证码', 2), alt: '安全加固' },
      { src: svgCover('内容生态', '文章 / 评论 / 标签 / 分类', 1), alt: '内容生态' },
      { src: svgCover('运营中枢', '多级菜单 / 幻灯片 / 友链', 3), alt: '运营中枢' },
    ],
    stack: ['Strapi 5', 'Turborepo', 'React', 'VitePress', 'Node.js'],
    status: 'Active',
    highlights: [
      '安全增强体系：内置 IP 黑白名单、RSA/AES 接口加密、图形/邮件验证码',
      '完善内容管理：提供文章、分类、标签、单页及多级评论审核系统',
      '可视化运营工具：支持多级菜单拖拽排序、幻灯片配置与友情链接管理',
      'Monorepo 架构：基于 Turborepo 管理插件源码、示例后端与使用文档',
    ],
    links: [
      { label: '文档', href: 'https://hangjob.github.io/strapi-plugin-bag/' },
    ],
  },
  {
    slug: 'nuxt-web-plugin',
    name: 'Nuxt Web Plugin 增强模块',
    badge: 'SEO + 快速模板开发',
    problem: '专注于解决 Nuxt 3/4 开发中的 SEO 配置繁琐与重复造轮子问题，助力快速构建高性能 SSR 应用。',
    role: '核心开发者。通过封装标准化的 SEO 策略与开发模板，极大提升了 Nuxt 项目的初始化效率与搜索引擎友好度。',
    openSource: true,
    cover: {
      src: svgCover('Nuxt Module', 'Security / Network / SEO', 3),
      alt: 'Nuxt Web Plugin',
    },
    images: [
      { src: svgCover('安全模块', 'AES / RSA / Hash / Storage', 1), alt: '安全模块' },
      { src: svgCover('网络请求', '统一封装 / 拦截器 / 类型提示', 2), alt: '网络请求' },
      { src: svgCover('工具集合', 'SEO / Device / Watermark', 3), alt: '工具集合' },
    ],
    stack: ['Nuxt 3', 'TypeScript', 'Web Crypto API', 'Tailwind CSS', 'VitePress'],
    status: 'Active',
    highlights: [
      '安全增强：内置 AES/RSA 加密、哈希计算及安全的 LocalStorage/Cookie 存储',
      '网络封装：基于 ofetch 的统一请求封装，支持拦截器与类型推断',
      '实用工具：集成 SEO 助手、设备检测、水印生成等高频功能',
      '完备生态：提供 Playground 演示环境与 VitePress 在线文档',
    ],
    links: [
      { label: '文档', href: 'https://hangjob.github.io/nuxt-web-plugin/' },
      { label: '演示', href: 'http://nuxt.haiwb.com/' },
    ],
  },
  {
    slug: 'realize-stock',
    name: 'Stock Realize 量化回测平台',
    badge: '小程序平台 + 创业项目',
    problem: '为个人投资者提供可视化的股票策略回测工具，支持自定义买卖条件、持仓控制与收益分析。',
    role: '项目负责人。基于 unibest 模板开发的小程序创业项目，实现了策略配置、图表分析与回测 API 的完整集成。',
    openSource: false,
    cover: {
      src: svgCover('量化回测', 'Strategy / Backtest / Chart', 2),
      alt: 'Stock Realize',
    },
    images: [
      { src: svgCover('策略配置', '买卖点 / 止盈止损 / 仓位管理', 1), alt: '策略配置' },
      { src: svgCover('回测报告', '收益曲线 / 交易明细 / 风险指标', 3), alt: '回测报告' },
      { src: svgCover('行情分析', 'K 线图 / 技术指标 / 选股结果', 2), alt: '行情分析' },
    ],
    stack: ['UniApp', 'Vue 3', 'TypeScript', 'uCharts', 'Alova'],
    status: 'Active',
    highlights: [
      '可视化策略构建：支持通过表单配置买入/卖出条件、持仓上限与资金分配',
      '专业回测引擎：集成 alova 请求库对接后端回测接口，实时生成交易明细与收益曲线',
      '移动端适配：基于 unibest 模板开发，支持 H5、小程序与 App 多端发布',
      '图表可视化：使用 qiun-data-charts (uCharts) 展示 K 线与策略表现',
    ],
    links: [],
  },
]

export const featuredProjectSlugs = ['vipbic-platform', 'vue-bag-admin', 'business-platform', 'tooling-starter'] as const
