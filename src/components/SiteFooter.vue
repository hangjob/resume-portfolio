<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteInfo, otherWorks } from '../data/site'

const navLinks = [
  { label: '首页', to: '/' },
  { label: '关于我', to: '/about' },
  { label: '项目/工具', to: '/projects' },
  { label: '联系方式', to: '/contact' },
]
</script>

<template>
  <footer class="mt-32 border-t border-slate-100  py-16 dark:border-white/5 dark:bg-black">
    <div class="container mx-auto px-6">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        <!-- Column 1: Brand -->
        <div class="lg:col-span-5">
          <RouterLink to="/" class="group flex items-center gap-2 no-underline">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-300 group-hover:scale-105 dark:bg-blue-600 dark:text-white">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6L10 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M6 10L3 13L6 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18 10L21 13L18 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-lg font-black tracking-tighter text-slate-900 dark:text-slate-100">
              {{ siteInfo.name }}<span class="text-blue-500">.</span>
            </span>
          </RouterLink>
          <p class="mt-6 max-w-sm text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            {{ siteInfo.tagline }}。融合视觉美学与工程严谨，打造具有生命力的数字化产品。
          </p>
          <div class="mt-8 flex gap-3">
            <a
              v-for="link in siteInfo.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-slate-900 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <font-awesome-icon v-if="link.label === 'GitHub'" :icon="['fab', 'github']" class="h-5 w-5" />
              <font-awesome-icon v-else :icon="['fas', 'globe']" class="h-4 w-4" />
            </a>
            <a
              :href="`mailto:${siteInfo.email}`"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-slate-900 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              <font-awesome-icon :icon="['fas', 'envelope']" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Column 2: Navigation -->
        <div class="lg:col-span-3">
          <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 dark:text-slate-500">探索</h4>
          <ul class="space-y-4">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink 
                :to="link.to" 
                class="text-sm font-bold text-slate-600 no-underline transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: Works -->
        <div class="lg:col-span-4">
          <h4 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 dark:text-slate-500">其他作品</h4>
          <ul class="space-y-4">
            <li v-for="work in otherWorks.slice(0, 4)" :key="work.name">
              <a 
                :href="work.href" 
                target="_blank"
                class="group flex flex-col no-underline"
              >
                <span class="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-500 dark:text-slate-200 dark:group-hover:text-blue-400">{{ work.name }}</span>
                <span class="text-[11px] font-medium text-slate-500 line-clamp-1 mt-0.5 dark:text-slate-500">{{ work.description }}</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-10 dark:border-white/5 sm:flex-row">
        <div class="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          © {{ new Date().getFullYear() }} {{ siteInfo.name }}. ALL RIGHTS RESERVED.
        </div>
        <div class="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          <div class="flex items-center gap-2">
            <span class="h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            VUE 3 + VITE
          </div>
          <div class="flex items-center gap-2">
            <span class="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            TAILWIND CSS
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
