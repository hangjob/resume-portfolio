<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteInfo } from '../data/site'
import wechatQr from '../assets/wechat.jpg'

const revealVisible = ref<Set<string>>(new Set())
let revealObserver: IntersectionObserver | null = null

const setElementRef = (el: any) => {
  if (el) revealObserver?.observe(el)
}

onMounted(() => {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slug = entry.target.getAttribute('data-slug')
        if (slug) {
          revealVisible.value.add(slug)
          revealVisible.value = new Set(revealVisible.value)
        }
      }
    })
  }, { threshold: 0.1 })

  // Initial show
  setTimeout(() => {
    revealVisible.value.add('header')
    revealVisible.value = new Set(revealVisible.value)
  }, 100)
})

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/hangjob',
    icon: ['fab', 'github'],
    desc: '查看开源项目与代码贡献',
    color: 'text-blue-500',
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20'
  },
  {
    name: '博客',
    url: 'https://www.vipbic.com/',
    icon: ['fas', 'globe'],
    desc: '技术分享与思考沉淀',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20'
  }
]
</script>

<template>
  <div class="max-w-[1200px] mx-auto space-y-12 pb-24 px-4 sm:px-8 pt-10 sm:pt-20">
    
    <!-- Header: Minimal & Clear -->
    <header 
      class="max-w-2xl transition-all duration-1000 transform"
      :class="revealVisible.has('header') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
      data-slug="header"
    >
      <h1 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
        Let's work together.
      </h1>
      <p class="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed">
        无论是潜在的合作机会、技术探讨，还是仅仅想打个招呼，我都非常乐意交流。我不使用复杂的表单，您可以直接联系我。
      </p>
    </header>

    <!-- Contact Grid: Pure Bento -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Big Email Card -->
      <div 
        class="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-slate-100 p-8 sm:p-12 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-1000 transform dark:bg-slate-900 dark:border-slate-800"
        :class="revealVisible.has('email-card') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        data-slug="email-card"
        :ref="setElementRef"
      >
        <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
              <font-awesome-icon icon="fa-solid fa-paper-plane" />
            </div>
            <h2 class="text-3xl font-black text-slate-900 tracking-tight mb-2 dark:text-white">发送邮件</h2>
            <p class="text-slate-500 font-medium dark:text-slate-400">我通常会在 24 小时内回复。</p>
          </div>
          
          <a 
            :href="`mailto:${siteInfo.email}`"
            class="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-base hover:bg-blue-600 transition-all active:scale-95 whitespace-nowrap dark:bg-slate-700 dark:hover:bg-blue-600"
          >
            {{ siteInfo.email }}
            <font-awesome-icon icon="fa-solid fa-link" class="text-xs opacity-50" />
          </a>
        </div>
      </div>

      <!-- WeChat Personal Card -->
      <div 
        class="lg:col-span-4 group relative rounded-[2.5rem] bg-green-50/50 border-2 border-green-500/20 p-8 transition-all duration-500 hover:-translate-y-1 transition-all duration-1000 transform dark:bg-slate-900 dark:border-green-500/10"
        :class="revealVisible.has('wechat-personal') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        data-slug="wechat-personal"
        :ref="setElementRef"
      >
        <div class="flex flex-col gap-4 items-center text-center h-full justify-center">
          <div class="relative w-32 h-32 bg-white rounded-2xl p-2 shadow-sm border border-green-100 transition-all duration-300 hover:scale-[1.8] hover:shadow-2xl cursor-zoom-in origin-center z-10 dark:bg-slate-800 dark:border-slate-700">
            <img :src="wechatQr" alt="WeChat QR" class="w-full h-full object-cover rounded-xl" />
          </div>
          <div class="z-0">
            <h3 class="text-xl font-black text-slate-900 mb-1 dark:text-white">个人微信</h3>
            <p class="text-sm text-slate-500 font-medium dark:text-slate-400"><span class="text-xs text-slate-400">(备注：寻求合作)</span></p>
          </div>
        </div>
      </div>

      <!-- Work Experience Card -->
      <div 
        class="lg:col-span-12 group relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-slate-100 p-8 sm:p-12 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-1000 transform dark:bg-slate-900 dark:border-slate-800"
        :class="revealVisible.has('work-experience') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        data-slug="work-experience"
        :ref="setElementRef"
      >
        <div class="flex items-center gap-4 mb-8">
           <div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-400">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-xl" />
          </div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight dark:text-white">工作经历</h2>
        </div>

        <div class="grid gap-8 md:grid-cols-2">
           <!-- Experience 1 -->
           <div class="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800">
             <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm dark:border-slate-900"></div>
             <div class="mb-1 text-sm font-bold text-slate-400 uppercase tracking-wider">Present</div>
             <h3 class="text-xl font-bold text-slate-900 dark:text-white">前端负责人</h3>
             <div class="text-slate-500 font-medium mb-2 dark:text-slate-400">品茗科技股份有限公司</div>
             <p class="text-slate-600 leading-relaxed text-sm dark:text-slate-300">
               负责前端团队管理与技术架构规划。主导核心业务系统重构，推动工程化建设，涵盖 Web、桌面端及 AI 工具链的落地实践。涉及技术栈广泛，致力于提升团队交付效率与代码质量。
             </p>
           </div>

           <!-- Experience 2 -->
           <div class="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800">
             <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm dark:border-slate-900 dark:bg-slate-600"></div>
             <div class="mb-1 text-sm font-bold text-slate-400 uppercase tracking-wider">Past</div>
             <h3 class="text-xl font-bold text-slate-900 dark:text-white">前端开发工程师</h3>
             <div class="text-slate-500 font-medium mb-2 dark:text-slate-400">前程无忧网络信息技术 (51jb)</div>
             <p class="text-slate-600 leading-relaxed text-sm dark:text-slate-300">
               主要负责网页端与移动端 App 的前端开发工作。参与多个核心模块的迭代与维护，积累了丰富的大型网站开发与跨端适配经验。
             </p>
           </div>
        </div>
      </div>

      <!-- WeChat Official Account Card -->
      <div 
        class="lg:col-span-4 group relative overflow-hidden rounded-[2rem] bg-white border-2 border-slate-100 p-8 transition-all duration-500 hover:-translate-y-1 transition-all duration-1000 transform dark:bg-slate-900 dark:border-slate-800"
        :class="revealVisible.has('wechat-official') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
        data-slug="wechat-official"
        :ref="setElementRef"
      >
        <div class="flex flex-col gap-6 h-full">
           <div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-green-500/10 text-green-600 border border-green-500/20 dark:bg-green-500/20 dark:text-green-400">
            <font-awesome-icon :icon="['fab', 'weixin']" class="text-xl" />
          </div>
          <div>
            <h3 class="text-xl font-black text-slate-900 dark:text-white">公众号</h3>
            <p class="text-sm text-slate-500 font-medium mb-6 dark:text-slate-400">关注获取更多技术干货与动态。</p>
            <a 
              href="https://www.vipbic.com/weixin.html" 
              target="_blank"
              class="inline-flex items-center gap-2 text-sm font-black text-slate-900 hover:text-green-600 transition-colors dark:text-white dark:hover:text-green-400"
            >
              查看二维码
              <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      <!-- Social Cards -->
      <div 
        v-for="(link, idx) in socialLinks" 
        :key="link.name"
        class="lg:col-span-4 group relative overflow-hidden rounded-[2rem] border-2 p-8 transition-all duration-500 hover:-translate-y-1 transition-all duration-1000 transform dark:border-slate-800"
        :class="[
          link.bg, link.border,
          revealVisible.has(`social-${idx}`) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        ]"
        :data-slug="`social-${idx}`"
        :ref="setElementRef"
      >
        <div class="flex flex-col gap-6">
          <div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border shadow-sm dark:bg-slate-900 dark:border-slate-700" :class="link.border">
            <font-awesome-icon :icon="link.icon" class="text-xl" :class="link.color" />
          </div>
          <div>
            <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ link.name }}</h3>
            <p class="text-sm text-slate-500 font-medium mb-6 dark:text-slate-400">{{ link.desc }}</p>
            <a 
              :href="link.url" 
              target="_blank"
              class="inline-flex items-center gap-2 text-sm font-black text-slate-900 hover:text-blue-600 transition-colors dark:text-white dark:hover:text-blue-400"
            >
              访问链接
              <font-awesome-icon icon="fa-solid fa-link" class="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
