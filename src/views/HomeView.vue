<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, siteInfo } from '../data/site'
import BarrageSystem from '../components/BarrageSystem.vue'

const openSourceCount = computed(() => projects.filter((p) => p.openSource).length)

// Barrage Logic
const showBarrage = ref(false)
const servicesSectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry) {
      showBarrage.value = entry.isIntersecting
    }
  }, { threshold: 0.15 })

  if (servicesSectionRef.value) {
    observer.observe(servicesSectionRef.value)
  }
})

// Parallax & Scroll Logic
const scrollY = ref(0)
const windowHeight = ref(1000) // default fallback

const updateScroll = () => {
  scrollY.value = window.scrollY
}

const updateResize = () => {
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  windowHeight.value = window.innerHeight
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('resize', updateResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  window.removeEventListener('resize', updateResize)
})

// Calculate opacity/transform based on scroll
const heroOpacity = computed(() => Math.max(0, 1 - scrollY.value / (windowHeight.value * 0.6)))
const heroScale = computed(() => 1 + scrollY.value * 0.0005)
const heroY = computed(() => scrollY.value * 0.3)

const serviceOfferings = [
  {
    title: '企业级网站开发',
    desc: '从品牌官网、电商平台到复杂的业务管理系统（CMS/ERP），提供高性能、响应式且 SEO 友好的全栈解决方案。',
    features: ['响应式设计', '性能优化', 'SEO 友好', '安全加固'],
    gradient: 'from-blue-600 to-indigo-600',
    icon: 'web'
  },
  {
    title: '小程序与移动端',
    desc: '深度定制微信、支付宝、抖音等多平台小程序，以及基于 UniApp/React Native 的跨端 H5 移动应用开发。',
    features: ['多端适配', '原生体验', '社交集成', '快速交付'],
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'mobile'
  },
  {
    title: 'App 跨平台开发',
    desc: '利用 Tauri、Electron 或 Flutter 技术栈，构建覆盖 Windows、macOS、iOS 与 Android 的跨平台桌面及移动应用。',
    features: ['高性能', '原生接口', '统一架构', '低成本维护'],
    gradient: 'from-purple-500 to-pink-600',
    icon: 'app'
  },
  {
    title: 'AI 数字化转型',
    desc: '将大模型能力（RAG、智能助手）集成至现有业务，提供 AI 工具构建、流程自动化及智能化交互的深度定制。',
    features: ['RAG 架构', '提示词工程', '工作流自动化', 'AI Agent'],
    gradient: 'from-amber-500 to-orange-600',
    icon: 'ai'
  }
]
</script>

<template>
  <div class="relative">
    <!-- Parallax Background Layer -->
    <div 
      class="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <!-- Gradient Orbs -->
      <div 
        class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[100px] transition-transform duration-100 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.2}px)` }"
      ></div>
      <div 
        class="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[100px] transition-transform duration-100 ease-out"
        :style="{ transform: `translateY(${-scrollY * 0.1}px)` }"
      ></div>
    </div>

    <!-- Hero Section (Parallax) -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        class="container relative z-10 px-6 sm:px-10"
        :style="{ opacity: heroOpacity, transform: `translateY(${heroY}px) scale(${heroScale})` }"
      >
        <div class="max-w-4xl mx-auto text-center">
          <div class="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in-up">
            <span class="pill text-[11px] backdrop-blur-md bg-[rgb(var(--surface-2))/0.5]">
              <span class="h-2 w-2 rounded-full bg-[rgb(var(--accent))] animate-pulse"></span>
              可合作 · 可远程
            </span>
            <span class="pill text-[11px] backdrop-blur-md bg-[rgb(var(--surface-2))/0.5]">
              Vue / TypeScript
            </span>
          </div>

          <h1 class="text-5xl sm:text-7xl font-bold leading-tight tracking-tight text-[rgb(var(--fg))] mb-6 animate-fade-in-up delay-100">
            <span class="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] bg-clip-text text-transparent">
              {{ siteInfo.title }}
            </span>
          </h1>

          <p class="text-lg sm:text-2xl text-[rgb(var(--muted))] leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            {{ siteInfo.tagline }}
          </p>

          <div class="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
             <RouterLink to="/projects" class="btn btn-primary px-8 py-3 text-base">
              查看项目
            </RouterLink>
            <RouterLink to="/contact" class="btn btn-ghost px-8 py-3 text-base">
              联系我
            </RouterLink>
          </div>

          <!-- Stats -->
          <div class="mt-16 flex justify-center gap-8 sm:gap-16 border-t border-[rgb(var(--border))] pt-8 animate-fade-in-up delay-500">
            <div class="text-center">
              <div class="text-3xl font-bold text-[rgb(var(--fg))]">58</div>
              <div class="text-xs font-medium text-[rgb(var(--muted))] uppercase tracking-wider mt-1">Projects</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[rgb(var(--fg))]">{{ openSourceCount }}</div>
              <div class="text-xs font-medium text-[rgb(var(--muted))] uppercase tracking-wider mt-1">Open Source</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-[rgb(var(--fg))]">10+</div>
              <div class="text-xs font-medium text-[rgb(var(--muted))] uppercase tracking-wider mt-1">Years Exp</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div 
        class="absolute bottom-10 left-1/2 -translate-x-1/2 text-[rgb(var(--muted-2))] animate-bounce"
        :style="{ opacity: heroOpacity }"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Philosophy Cards (Staggered Parallax) -->
    <section class="relative z-10 py-32 px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden">
      <!-- Barrage Background Layer -->
      <BarrageSystem :active="true" class="absolute inset-0 z-0 pointer-events-auto" style="z-index: 50;" />
      
      <div class="grid gap-8 md:grid-cols-3 relative z-10 pointer-events-none">
        <!-- Card 1: Slow -->
        <div 
          class="panel p-8 transition-transform duration-75 ease-out pointer-events-auto backdrop-blur-sm bg-white/90 dark:bg-slate-900/90"
          :style="{ transform: `translateY(${(scrollY - windowHeight) * -0.05}px)` }"
        >
          <div class="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">写清楚</h3>
          <p class="text-[rgb(var(--muted))] leading-relaxed">目标明确，边界清晰。在编码之前，先理清业务逻辑与技术权衡。</p>
        </div>

        <!-- Card 2: Medium (Sticky-ish feel) -->
        <div 
          class="panel panel-accent p-8 transition-transform duration-75 ease-out md:mt-12 pointer-events-auto backdrop-blur-sm bg-white/90 dark:bg-slate-900/90"
          :style="{ transform: `translateY(${(scrollY - windowHeight) * -0.02}px)` }"
        >
          <div class="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h6l3 8 4-16 3 8h2"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">做稳定</h3>
          <p class="text-[rgb(var(--muted))] leading-relaxed">可维护，可观测。构建不仅仅是“能跑”的系统，而是长期可靠的架构。</p>
        </div>

        <!-- Card 3: Fast -->
        <div 
          class="panel p-8 transition-transform duration-75 ease-out md:mt-24 pointer-events-auto backdrop-blur-sm bg-white/90 dark:bg-slate-900/90"
          :style="{ transform: `translateY(${(scrollY - windowHeight) * 0.05}px)` }"
        >
          <div class="h-12 w-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"/><path d="M12 12l3 2"/><path d="M12 7v5"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">提效率</h3>
          <p class="text-[rgb(var(--muted))] leading-relaxed">工程化，自动化。用工具解决重复劳动，专注于创造核心价值。</p>
        </div>
      </div>
    </section>

    <!-- Services Section (Business Offering) -->
    <section 
      ref="servicesSectionRef"
      class="relative z-10 py-32 bg-[rgb(var(--surface-2))]/30 overflow-hidden"
    >
      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Services & Solutions
          </div>
          <h2 class="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            承接各类定制开发业务
          </h2>
          <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            凭借多年的全栈开发经验与工程化实践，为您提供从咨询、设计到上线的闭环技术交付。
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 relative z-10">
          <div
            v-for="(service, index) in serviceOfferings"
            :key="service.title"
            class="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2 dark:bg-slate-900 dark:border-slate-800"
          >
            <!-- Background Accent -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" :class="service.gradient"></div>

            <div class="relative flex flex-col h-full">
              <div class="flex items-center justify-between mb-8">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110 group-hover:rotate-3" :class="service.gradient">
                  <svg v-if="service.icon === 'web'" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  <svg v-else-if="service.icon === 'mobile'" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  <svg v-else-if="service.icon === 'app'" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <svg v-else class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-blue-500 transition-colors">
                  Solution 0{{ index + 1 }}
                </div>
              </div>

              <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-4 transition-colors group-hover:text-blue-600">
                {{ service.title }}
              </h3>
              
              <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-grow">
                {{ service.desc }}
              </p>

              <div class="grid grid-cols-2 gap-3 mt-auto">
                <div 
                  v-for="feature in service.features" 
                  :key="feature"
                  class="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400"
                >
                  <div class="h-1.5 w-1.5 rounded-full bg-blue-500/40"></div>
                  {{ feature }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Area -->
        <div class="mt-20 p-10 rounded-[3rem] bg-slate-900 text-white overflow-hidden relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 class="text-3xl font-black mb-2">准备好启动您的项目了吗？</h3>
              <p class="text-slate-400 font-medium max-w-lg">
                无论是一个简单的想法，还是复杂的系统架构，我都能为您提供专业的技术支持。
              </p>
            </div>
            <RouterLink to="/contact" class="btn bg-white text-slate-900 hover:bg-blue-500 hover:text-white px-10 py-4 text-lg font-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 rounded-full">
              立即开始咨询
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
