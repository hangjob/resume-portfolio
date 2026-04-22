<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { aboutMotto, journeyTimeline, siteInfo } from '../data/site'

// Scroll State
const scrollY = ref(0)
const updateScroll = () => {
  scrollY.value = window.scrollY
}

// Time State
const currentTime = ref('')
let timeInterval: any

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Shanghai'
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll, { passive: true })
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  if (timeInterval) clearInterval(timeInterval)
})

// Computed Props
const timelineYears = computed(() => {
  return journeyTimeline
    .map((item) => Number(item.year))
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => a - b)
})

const timelineRangeLabel = computed(() => {
  if (!timelineYears.value.length) return '—'
  const first = timelineYears.value[0]!
  const last = timelineYears.value[timelineYears.value.length - 1]!
  return `${first}–${last}`
})

const experienceYears = computed(() => {
  if (!timelineYears.value.length) return 5
  const first = timelineYears.value[0] || 2017
  const current = new Date().getFullYear()
  return current - first + 1
})

const printResume = () => {
  window.print()
}

// Visual Data Assets
const techStack = [
  { name: 'Vue', icon: ['fab', 'vuejs'], color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { name: 'TypeScript', icon: ['fab', 'js'], color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Node.js', icon: ['fab', 'node-js'], color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Tailwind', icon: ['fab', 'css3-alt'], color: 'text-cyan-500', bg: 'bg-cyan-50' },
]

const activityGraph = Array.from({ length: 42 }).map(() => Math.random() > 0.3)

const interests = ['Photography', 'Gym', 'Indie Hacking', 'UI Design', 'Coffee']

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN

const mapPreviewUrl = computed(() => {
  if (!mapboxToken) return ''
  return `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/120.1551,30.2741,12,0/400x400?access_token=${encodeURIComponent(mapboxToken)}`
})

</script>

<template>
  <div class="min-h-screen text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
    
    <div class="max-w-[1400px] mx-auto">
      
      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        
        <!-- 1. Profile Card (Large) -->
        <div class="col-span-1 md:col-span-4 lg:col-span-4 row-span-2 bg-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border dark:border-slate-800">
          <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none dark:from-blue-900/20 dark:to-indigo-900/20"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl dark:bg-slate-800">👨‍💻</div>
              <div>
                <h1 class="text-2xl font-black text-slate-900 dark:text-white">{{ siteInfo.name }}</h1>
                <p class="text-sm text-slate-500 font-medium dark:text-slate-400">Senior Frontend Engineer</p>
              </div>
              <div class="ml-auto flex gap-2">
                <button 
                  @click="printResume"
                  class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center gap-1.5 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  title="Print Resume / Save as PDF"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                  Print / PDF
                </button>
                <div class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1.5 dark:bg-green-900/30 dark:text-green-400">
                  <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Open to Work
                </div>
              </div>
            </div>
            
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-slate-800 tracking-tight dark:text-slate-100">
              Building <span class="text-blue-600 dark:text-blue-400">digital products</span> with <br class="hidden sm:block" /> focus on engineering & design.
            </h2>
            
            <p class="text-lg text-slate-500 max-w-2xl leading-relaxed dark:text-slate-400">
              {{ siteInfo.title }}。专注复杂业务系统架构与 AI 工程化落地。
              Turning chaos into structure, and ideas into reality.
            </p>
          </div>

          <div class="relative z-10 mt-8 flex gap-4">
             <a href="#contact" class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/10 dark:bg-blue-600 dark:hover:bg-blue-500">
               Get in touch
             </a>
             <a href="#projects" class="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
               View Projects
             </a>
          </div>
        </div>

        <!-- 2. Map / Location Card (Small) -->
        <div class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-slate-900 rounded-3xl p-6 relative overflow-hidden group shadow-sm dark:border dark:border-slate-800">
           <div
             class="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity bg-cover bg-center"
             :style="mapPreviewUrl ? { backgroundImage: `url('${mapPreviewUrl}')` } : undefined"
           ></div>
           <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
           <div class="relative z-10 h-full flex flex-col justify-between">
             <div class="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
               <font-awesome-icon icon="fa-solid fa-location-dot" class="w-4 h-4" />
             </div>
             <div>
               <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Base</div>
               <div class="text-xl font-bold text-white">Hangzhou, CN</div>
               <div class="text-xs text-slate-400 mt-1 tabular-nums">GMT+8 • {{ currentTime }}</div>
             </div>
           </div>
        </div>

        <!-- 3. Tech Stack Grid (Small) -->
        <div class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between dark:bg-slate-900 dark:border dark:border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Stack</span>
            <span class="text-xs font-bold text-slate-300 dark:text-slate-600">CORE</span>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div v-for="tech in techStack" :key="tech.name" :class="`aspect-square rounded-2xl ${tech.bg} flex items-center justify-center text-2xl group relative cursor-help dark:bg-slate-800`">
               <div class="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                 <font-awesome-icon :icon="tech.icon" :class="`w-6 h-6 ${tech.color}`" />
               </div>
               <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                 {{ tech.name }}
               </div>
            </div>
          </div>
        </div>

        <!-- 4. GitHub Stats / Activity (Tall) -->
        <div class="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-3xl p-6 shadow-sm flex flex-col relative overflow-hidden dark:bg-slate-900 dark:border dark:border-slate-800">
          <div class="flex items-center justify-between mb-6 relative z-10">
             <div class="flex items-center gap-2">
               <div class="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white border border-slate-700 dark:bg-white dark:text-slate-900">
                 <font-awesome-icon :icon="['fab', 'github']" class="w-5 h-5" />
               </div>
               <span class="font-bold text-slate-700 dark:text-slate-200">GitHub</span>
             </div>
             <a :href="siteInfo.links.find(l => l.label === 'GitHub')?.href" target="_blank" class="text-xs font-bold text-blue-500 hover:underline">@hangjob</a>
          </div>

          <div class="flex-1 flex flex-col justify-end">
            <div class="text-4xl font-black text-slate-900 mb-1 dark:text-white">1,024+</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Stars Earned</div>
            
            <!-- Fake Contribution Graph -->
            <div class="flex flex-wrap gap-1 content-end h-32 opacity-60">
               <div v-for="(active, i) in activityGraph" :key="i" 
                 class="w-3 h-3 rounded-sm transition-colors duration-500 hover:scale-125"
                 :class="active ? 'bg-green-500' : 'bg-slate-100 dark:bg-slate-800'"
               ></div>
            </div>
          </div>
        </div>

        <!-- 5. Experience Stats (Small) -->
        <div class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-yellow-400 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden shadow-sm group dark:bg-yellow-500">
          <div class="absolute -right-6 -top-6 w-24 h-24 bg-yellow-300 rounded-full group-hover:scale-125 transition-transform duration-500 dark:bg-yellow-400"></div>
          <div class="relative z-10">
            <div class="text-6xl font-black text-yellow-950">{{ experienceYears }}<span class="text-2xl align-top">+</span></div>
            <div class="text-sm font-bold text-yellow-800 uppercase tracking-wider mt-1 dark:text-yellow-900">Years Exp.</div>
          </div>
        </div>

        <!-- 6. Interests / Tags (Wide) -->
        <div class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center dark:bg-slate-900 dark:border dark:border-slate-800">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Interests</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in interests" :key="tag" class="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 hover:border-slate-200 transition-colors cursor-default dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 7. Philosophy / Motto (Wide) -->
        <div class="col-span-1 md:col-span-4 lg:col-span-4 row-span-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 flex items-center relative overflow-hidden shadow-sm text-white group dark:from-emerald-600 dark:to-teal-600">
          <div class="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
             <font-awesome-icon icon="fa-solid fa-lightbulb" class="w-32 h-32" />
          </div>
          <div class="relative z-10 max-w-2xl">
            <div class="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-2">Philosophy</div>
            <p class="text-xl sm:text-2xl font-bold leading-relaxed">
              “{{ aboutMotto[1] }}”
            </p>
          </div>
        </div>

        <!-- 8. Journey / History (Vertical Visual Timeline) -->
        <div class="col-span-1 md:col-span-4 lg:col-span-6 bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm relative overflow-hidden dark:bg-slate-900 dark:border dark:border-slate-800">
           <div class="flex items-center justify-between mb-16 relative z-10">
             <div>
               <h3 class="text-3xl font-black text-slate-900 tracking-tight dark:text-white">Career Journey</h3>
               <p class="text-sm text-slate-400 font-medium mt-1">My evolution through the years</p>
             </div>
             <div class="flex flex-col items-end">
               <span class="text-2xl font-black text-blue-600/20 leading-none tracking-tighter dark:text-blue-400/20">EST. 2017</span>
               <span class="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 dark:text-slate-600">{{ timelineRangeLabel }}</span>
             </div>
           </div>
           
           <div class="relative pl-8 sm:pl-12">
             <!-- Vertical Line -->
             <div class="absolute left-[11px] top-2 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800">
               <div class="absolute inset-0 bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent h-32"></div>
             </div>

             <div class="space-y-16">
               <div v-for="(item, idx) in journeyTimeline.slice().reverse()" :key="item.year" class="relative group">
                 <!-- Node Dot -->
                 <div class="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-slate-100 group-hover:border-blue-500 transition-all duration-500 z-10 flex items-center justify-center dark:bg-slate-900 dark:border-slate-700 dark:group-hover:border-blue-500">
                   <div class="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors dark:bg-slate-600"></div>
                 </div>

                 <!-- Content Card -->
                 <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                   <div class="flex-shrink-0">
                     <span class="text-4xl font-black text-slate-100 group-hover:text-blue-500/10 transition-colors duration-500 leading-none dark:text-slate-800 dark:group-hover:text-blue-500/10">
                       '{{ item.year.slice(-2) }}
                     </span>
                   </div>
                   <div class="flex-1 pt-1">
                     <div class="flex flex-wrap items-center gap-3 mb-3">
                       <h4 class="font-bold text-slate-900 text-xl tracking-tight dark:text-white">{{ item.title }}</h4>
                       <span v-if="idx === 0" class="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-black rounded uppercase tracking-wider animate-pulse">Present</span>
                     </div>
                     <p class="text-sm text-slate-500 leading-relaxed mb-4 dark:text-slate-400">{{ item.description }}</p>
                     
                     <!-- Tags -->
                     <div class="flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                       <span v-for="tag in (item.tags || [])" :key="tag" class="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg border border-slate-100 group-hover:border-blue-100 group-hover:text-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500 dark:group-hover:text-blue-400">
                         #{{ tag }}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <!-- Background Decoration -->
           <div class="absolute -right-20 bottom-0 opacity-[0.03] pointer-events-none select-none dark:opacity-[0.05]">
             <span class="text-[20rem] font-black leading-none dark:text-white">CV</span>
           </div>
        </div>

        <!-- 9. Connect / Contact (Wide - Redesigned Muted) -->
        <div id="contact" class="col-span-1 md:col-span-4 lg:col-span-6 bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden text-white shadow-sm group dark:bg-black dark:border dark:border-slate-800">
          <div class="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div class="relative z-10 mb-8 md:mb-0 text-center md:text-left">
            <h3 class="text-3xl font-black mb-2 tracking-tight">Let's work together</h3>
            <p class="text-slate-400 font-medium">Have a project in mind? Reach out and let's build something great.</p>
          </div>

          <div class="relative z-10 flex flex-col sm:flex-row gap-4 items-center">
            <a :href="`mailto:${siteInfo.email}`" class="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center gap-2 dark:bg-slate-800 dark:text-white dark:hover:bg-blue-600">
              <font-awesome-icon icon="fa-solid fa-link" class="w-4 h-4 opacity-50" />
              {{ siteInfo.email }}
            </a>
            <div class="flex gap-3">
              <a v-for="link in siteInfo.links" :key="link.href" :href="link.href" target="_blank" class="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700 dark:bg-slate-900 dark:border-slate-800">
                <font-awesome-icon :icon="link.label === 'GitHub' ? ['fab', 'github'] : ['fas', 'link']" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar hiding if needed */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
