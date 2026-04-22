<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { siteInfo } from '../data/site'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const { theme, toggleTheme } = useTheme()

const emit = defineEmits<{
  (e: 'open-search'): void
}>()

type NavItem = { label: string; to: string }

const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '关于我', to: '/about' },
  { label: '项目/工具', to: '/projects' },
  { label: '联系', to: '/contact' },
]

const activePath = computed(() => route.path)

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
    <div class="mx-auto max-w-5xl relative">
      <div class="flex h-14 items-center justify-between rounded-full border border-white/20 bg-white/70 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 dark:border-slate-800/50 dark:bg-slate-900/70 relative z-20">
        
        <!-- Left: Logo -->
        <RouterLink to="/" class="group flex items-center gap-2 pl-2 no-underline" @click="closeMobileMenu">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:text-slate-900">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6L10 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M6 10L3 13L6 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 10L21 13L18 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="hidden text-sm font-black tracking-tight text-slate-900 dark:text-white sm:block">
            {{ siteInfo.name.split(' ')[0] }}<span class="text-blue-500">.</span>
          </span>
        </RouterLink>

        <!-- Center: Navigation (Desktop) -->
        <nav class="hidden items-center gap-1 sm:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative rounded-full px-4 py-1.5 text-[13px] font-bold text-slate-500 no-underline transition-all hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            :class="activePath === item.to ? 'text-slate-900 dark:text-white' : ''"
          >
            {{ item.label }}
            <div v-if="activePath === item.to" class="absolute inset-0 -z-10 rounded-full bg-slate-100 dark:bg-slate-800"></div>
          </RouterLink>
        </nav>

        <!-- Right: Actions -->
        <div class="flex items-center gap-2">
          <!-- Search Button -->
          <button
            type="button"
            class="group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:w-auto sm:px-3 sm:gap-2"
            @click="emit('open-search')"
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span class="hidden text-[10px] font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 sm:inline-block">Cmd+K</span>
          </button>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            @click="toggleTheme"
            :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到暗黑模式'"
          >
            <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.07" x2="5.64" y2="17.66"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          
          <RouterLink to="/contact" class="hidden rounded-full bg-slate-900 px-5 py-2 text-[13px] font-black text-white no-underline transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-400 sm:block">
            Hire Me
          </RouterLink>

          <!-- Mobile Menu Toggle (Simplified) -->
          <button 
            class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-900 sm:hidden dark:bg-slate-800 dark:text-white transition-colors"
            @click="toggleMobileMenu"
          >
            <svg v-if="!isMobileMenuOpen" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

      </div>

      <!-- Mobile Menu Dropdown -->
      <div 
        v-if="isMobileMenuOpen"
        class="absolute top-full left-0 right-0 mt-2 p-2 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl dark:bg-slate-900/90 dark:border-slate-800 sm:hidden origin-top animate-fade-in-down"
      >
        <nav class="flex flex-col gap-1 p-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-600 no-underline transition-all hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            :class="activePath === item.to ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : ''"
            @click="closeMobileMenu"
          >
            {{ item.label }}
            <div v-if="activePath === item.to" class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
          </RouterLink>
          
          <div class="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
          
          <RouterLink 
            to="/contact" 
            class="flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white no-underline transition-all active:scale-95 dark:bg-white dark:text-slate-900"
            @click="closeMobileMenu"
          >
            Hire Me
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.2s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
