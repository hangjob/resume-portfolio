# hangjob-portfolio-site

一个基于 `Vue 3 + TypeScript + Vite + Tailwind CSS` 构建的个人作品集与简历站点，聚焦于：

- 个人品牌展示（首页 / 关于 / 项目 / 联系）
- 项目案例与技术能力表达
- 动效与交互体验（视差、Reveal、弹幕、命令面板）
- 一键打印简历（`window.print` + 自定义打印样式）

## 技术栈

- `Vue 3`（`<script setup lang="ts">`）
- `Vue Router 4`
- `Vite 7`
- `TypeScript`
- `Tailwind CSS + PostCSS + Autoprefixer`
- `Font Awesome`

## 页面结构

- `/` 首页：Hero 视差、服务卡片、交互弹幕
- `/about` 关于我：Bento 风格信息面板、职业时间线、打印简历入口
- `/projects` 项目/工具：项目画廊、滚动切换、鼠标倾斜、Reveal 动效
- `/contact` 联系：邮箱、微信、社交链接与工作经历

## 核心特性

- 主题切换：`useTheme` + `localStorage` 持久化 + 系统深色模式跟随
- 全局命令面板：`Cmd/Ctrl + K` 打开，支持页面跳转、项目搜索、快捷操作
- 数据驱动内容：站点信息、项目列表、时间线集中管理在 `src/data/site.ts`
- 响应式布局：覆盖桌面与移动端导航（含移动菜单）
- 打印优化：`src/style.css` 中提供专门的打印样式规则

## 目录说明

```txt
site/
  src/
    components/        # 通用组件（头部、页脚、命令面板、弹幕等）
    composables/       # 组合式逻辑（如 useTheme）
    data/              # 站点数据源（site.ts）
    router/            # 路由配置
    views/             # 路由页面
    App.vue            # 应用壳
    main.ts            # 入口文件
    style.css          # 全局样式与打印样式
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

或

```bash
npm install
```

### 2. 启动开发环境

```bash
pnpm dev
```

或

```bash
npm run dev
```

### 3. 构建生产包

```bash
pnpm build
```

### 4. 本地预览

```bash
pnpm preview
```

## 内容配置入口

主要内容都可以通过编辑以下文件快速调整：

- `src/data/site.ts`
  - 站点名称、标题、简介、联系方式
  - 项目列表与亮点
  - 职业时间线与其他作品链接
- `src/views/*.vue`
  - 各页面结构与交互动效
- `src/style.css`
  - 主题变量、全局视觉风格、打印样式

## 备注

- 当前仓库同时存在 `pnpm-lock.yaml` 与 `package-lock.json`，建议团队内统一一个包管理器，避免锁文件冲突。
- 命令面板里的“复制邮箱”动作默认值在 `src/components/CommandPalette.vue` 中，可按实际邮箱替换。


