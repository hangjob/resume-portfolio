<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Project } from '../data/site'
import { projects } from '../data/site'

const openSourceCount = computed(() => projects.filter((p) => p.openSource).length)

const imagesOf = (project: Project) => {
  if (project.images?.length) return project.images
  if (project.cover?.src) return [project.cover]
  return []
}

const activeSlideIndex = ref<Record<string, number>>({})

const onGalleryScroll = (slug: string, event: Event) => {
  const viewport = event.target as HTMLDivElement
  if (!viewport) return
  const w = viewport.clientWidth || 1
  const idx = Math.round(viewport.scrollLeft / w)
  if (activeSlideIndex.value[slug] === idx) return
  activeSlideIndex.value = { ...activeSlideIndex.value, [slug]: idx }
}

const goToSlide = (slug: string, idx: number) => {
  const viewport = document.querySelector(`[data-viewport="${slug}"]`) as HTMLDivElement
  if (!viewport) return
  viewport.scrollTo({ left: idx * viewport.clientWidth, behavior: 'smooth' })
}

// Advanced JS Interactions: Parallax, Reveal, and Tilt
const cardRefs = ref<HTMLElement[]>([])
const revealVisible = ref<Set<string>>(new Set())
let parallaxObserver: IntersectionObserver | null = null
let revealObserver: IntersectionObserver | null = null
let parallaxRaf = 0
const parallaxVisible = new Set<HTMLElement>()

const setCardRef = (el: any) => {
  if (el && !cardRefs.value.includes(el)) {
    cardRefs.value.push(el)
  }
}

const updateParallax = () => {
  if (parallaxRaf) return
  parallaxRaf = window.requestAnimationFrame(() => {
    parallaxRaf = 0
    const viewportMid = window.innerHeight / 2
    for (const el of parallaxVisible) {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const raw = (center - viewportMid) / viewportMid
      const clamped = Math.max(-1, Math.min(1, raw))
      el.style.setProperty('--sp', clamped.toFixed(4))
    }
  })
}

// Mouse Tilt Effect
const handleMouseMove = (e: MouseEvent, el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const xc = rect.width / 2
  const yc = rect.height / 2
  const dx = (x - xc) / xc
  const dy = (y - yc) / yc
  
  el.style.setProperty('--rx', `${dy * -5}deg`)
  el.style.setProperty('--ry', `${dx * 5}deg`)
}

const handleMouseLeave = (el: HTMLElement) => {
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

onMounted(() => {
  // Parallax Observer
  parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) parallaxVisible.add(entry.target as HTMLElement)
      else parallaxVisible.delete(entry.target as HTMLElement)
    })
    updateParallax()
  }, { threshold: 0 })

  // Reveal Observer
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slug = entry.target.getAttribute('data-slug')
        if (slug) {
          revealVisible.value.add(slug)
          // Trigger Vue reactivity for Set
          revealVisible.value = new Set(revealVisible.value)
        }
      }
    })
  }, { threshold: 0.1 })

  cardRefs.value.forEach(el => {
    parallaxObserver?.observe(el)
    revealObserver?.observe(el)
  })
  
  window.addEventListener('scroll', updateParallax, { passive: true })
  
  // Ensure Hero is shown if it's already in viewport or after a small delay
  setTimeout(() => {
    if (!revealVisible.value.has('hero')) {
      revealVisible.value.add('hero')
      revealVisible.value = new Set(revealVisible.value)
    }
  }, 100)
})

onBeforeUnmount(() => {
  parallaxObserver?.disconnect()
  revealObserver?.disconnect()
  window.removeEventListener('scroll', updateParallax)
  if (parallaxRaf) window.cancelAnimationFrame(parallaxRaf)
})

// Flat Color Palette - Optimized for White Card Background
const cardStyles = [
  { border: 'border-blue-500/20', shadow: 'shadow-blue-100', accent: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', bg: 'bg-blue-50/50' },
  { border: 'border-emerald-500/20', shadow: 'shadow-emerald-100', accent: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50', bg: 'bg-emerald-50/50' },
  { border: 'border-yellow-500/20', shadow: 'shadow-yellow-100', accent: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', bg: 'bg-yellow-50/50' },
  { border: 'border-purple-500/20', shadow: 'shadow-purple-100', accent: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', bg: 'bg-purple-50/50' },
  { border: 'border-rose-500/20', shadow: 'shadow-rose-100', accent: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-50', bg: 'bg-rose-50/50' },
]

const getCardStyle = (index: number) => cardStyles[index % cardStyles.length]!

</script>

<template>
  <div class="max-w-[1300px] mx-auto space-y-12 sm:space-y-16 pb-24 px-4 sm:px-8">
    
    <!-- Hero Section -->
    <section class="relative overflow-hidden rounded-[2.5rem] bg-slate-900 pt-16 pb-20 px-8 sm:px-12 text-white shadow-2xl transition-all duration-1000 transform dark:bg-black dark:border dark:border-slate-800"
      :class="revealVisible.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
      data-slug="hero"
      :ref="setCardRef"
    >
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">
          <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          Selected Works
        </div>
        
        <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
          DESIGN<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">DRIVEN.</span>
        </h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <p class="text-lg sm:text-xl font-medium text-slate-400 leading-relaxed max-w-lg">
            融合视觉美学与工程严谨，打造具有生命力的数字化产品。
          </p>
          
          <div class="flex gap-10 border-l-2 border-slate-800 pl-8">
             <div class="flex flex-col">
               <span class="text-4xl font-black text-white leading-none">{{ projects.length }}</span>
               <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-2">Projects</span>
             </div>
             <div class="flex flex-col">
               <span class="text-4xl font-black text-blue-500 leading-none">{{ openSourceCount }}</span>
               <span class="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-2">Open Source</span>
             </div>
          </div>
        </div>
      </div>
      <div class="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none"></div>
    </section>

    <!-- Projects List: Refined Parallax & Reveal Style -->
    <section class="space-y-16 sm:space-y-20">
      <article
        v-for="(p, index) in projects"
        :key="p.slug"
        :ref="setCardRef"
        :data-slug="p.slug"
        class="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-1000 transform bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:bg-slate-900 dark:border-slate-800"
        :class="revealVisible.has(p.slug) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'"
        :style="{ '--sp': '0', '--rx': '0deg', '--ry': '0deg' }"
      >
        <!-- Project Visual (Parallax + Tilt) -->
        <div 
          class="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl shadow-sm transition-all duration-500 will-change-transform border dark:border-slate-700"
          :class="[getCardStyle(index).border, index % 2 === 0 ? 'lg:order-1' : 'lg:order-2 lg:col-start-6']"
          @mousemove="(e) => handleMouseMove(e, e.currentTarget as HTMLElement)"
          @mouseleave="(e) => handleMouseLeave(e.currentTarget as HTMLElement)"
          style="transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))"
        >
          <div
            class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full w-full"
            :data-viewport="p.slug"
            @scroll.passive="(e) => onGalleryScroll(p.slug, e)"
          >
            <div v-for="img in imagesOf(p)" :key="img.src" class="flex-shrink-0 w-full h-full snap-center overflow-hidden">
              <img
                :src="img.src"
                :alt="img.alt ?? p.name"
                class="w-full h-[110%] object-cover transition-transform duration-100 ease-out will-change-transform"
                style="transform: translateY(calc(var(--sp) * 5% - 2.5%))"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Glassmorphism Controls: Compact -->
          <div class="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
            <div class="flex gap-1.5">
              <span v-if="p.stars" class="px-3 py-1 bg-amber-500/80 backdrop-blur-xl border border-amber-300/50 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center gap-1.5 animate-pulse">
                <font-awesome-icon icon="star" class="w-2.5 h-2.5 text-yellow-200" />
                {{ p.stars }}
              </span>
              <span v-if="p.badge" class="px-3 py-1 bg-purple-500/80 backdrop-blur-xl border border-purple-300/50 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] flex items-center gap-1.5">
                {{ p.badge }}
              </span>
              <span v-if="p.openSource" class="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
                OSS
              </span>
              <span v-if="p.status" class="px-3 py-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/80">
                {{ p.status }}
              </span>
            </div>
            
            <div v-if="imagesOf(p).length > 1" class="flex gap-1.5 p-1.5 bg-black/20 backdrop-blur-xl rounded-full pointer-events-auto">
              <button
                v-for="(_, idx) in imagesOf(p)"
                :key="idx"
                class="h-1.5 rounded-full transition-all duration-500"
                :class="(activeSlideIndex[p.slug] ?? 0) === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'"
                @click="goToSlide(p.slug, idx)"
              ></button>
            </div>
          </div>
        </div>

        <!-- Project Info -->
        <div 
          class="lg:col-span-5 flex flex-col justify-center transition-transform duration-700"
          :class="[index % 2 === 0 ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4']"
        >
          <div class="mb-5">
            <div class="text-[9px] font-black uppercase tracking-[0.4em] mb-2 opacity-50 group-hover:opacity-100 transition-opacity" :class="getCardStyle(index).text">
              Project {{ String(index + 1).padStart(2, '0') }}
            </div>
            <h2 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-4 group-hover:text-blue-600 transition-colors">
              {{ p.name }}
            </h2>
            <p class="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-md">
              {{ p.problem }}
            </p>
          </div>

          <div class="space-y-6">
            <div class="p-5 rounded-2xl border transition-all duration-500 group-hover:scale-[1.02]" :class="[getCardStyle(index).bg, getCardStyle(index).border]">
               <ul class="space-y-2">
                 <li v-for="item in p.highlights?.slice(0, 3)" :key="item" class="flex items-start gap-3 text-[12px] font-bold" :class="getCardStyle(index).text">
                   <div class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" :class="getCardStyle(index).accent"></div>
                   <span>{{ item }}</span>
                 </li>
               </ul>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in p.stack?.slice(0, 5)"
                  :key="tech"
                  class="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[8px] font-black uppercase tracking-wider"
                >
                  {{ tech }}
                </span>
              </div>
              
              <div class="flex gap-2">
                 <a v-for="link in p.links" :key="link.href" :href="link.href" target="_blank" class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all shadow-lg hover:-translate-y-1 active:scale-95">
                    <font-awesome-icon :icon="link.label === 'GitHub' ? ['fab', 'github'] : ['fas', 'link']" class="w-4 h-4" />
                 </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

article {
  --sp: 0;
  --rx: 0deg;
  --ry: 0deg;
}
</style>
