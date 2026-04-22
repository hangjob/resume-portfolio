<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps<{
  active: boolean
}>()

interface Message {
  text: string
  icon: string
  type: string
  id: number
  liked?: boolean
}

const rawMessages = [
  { text: '1000元做2个H5页面', icon: '💻', type: 'business' },
  { text: '接单吗？有个小需求', icon: '👋', type: 'collab' },
  { text: '预算2k，这种效果能做吗？', icon: '💰', type: 'business' },
  { text: '急！今晚就要上线', icon: '🔥', type: 'business' },
  { text: '仿一个简单的落地页', icon: '🎨', type: 'business' },
  { text: '学生毕设，预算不高', icon: '🎓', type: 'collab' },
  { text: '只要切图，不用JS', icon: '✂️', type: 'tech' },
  { text: '长期合作，价格好商量', icon: '🤝', type: 'collab' },
  { text: '有个bug修一下，500块', icon: '🐛', type: 'tech' },
  { text: '能开发票吗？走对公', icon: '🧾', type: 'business' },
  { text: '想做一个类似滴滴的App', icon: '🚗', type: 'business' },
  { text: 'Vue3 + TS 项目外包', icon: '⚡', type: 'tech' },
  { text: '需要开发一个电商小程序', icon: '🛍️', type: 'business' },
  { text: 'UniApp 跨端开发', icon: '📱', type: 'tech' },
  { text: '急需 AI 助手集成方案', icon: '🤖', type: 'tech' },
  { text: '后台管理系统重构', icon: '⚙️', type: 'tech' },
  { text: '数据大屏可视化项目', icon: '📊', type: 'business' },
  { text: 'SaaS 平台 MVP 开发', icon: '🚀', type: 'business' },
]

interface BarrageItem {
  uid: string
  data: Message
  x: number
  width: number
  hover: boolean
}

interface Track {
  items: BarrageItem[]
  speed: number
  direction: 1 | -1 // 1: left, -1: right
}

const tracks = ref<Track[]>([])
const itemRefs = new Map<string, HTMLElement>()
let rafId: number

const setItemRef = (el: any, uid: string) => {
  if (el) itemRefs.set(uid, el as HTMLElement)
}

const toggleLike = (trackIndex: number, itemIndex: number) => {
  const track = tracks.value[trackIndex]
  if (track && track.items[itemIndex]) {
    const item = track.items[itemIndex]
    item.data.liked = !item.data.liked
  }
}

const initTracks = () => {
  const allMessages: Message[] = rawMessages.map((m, i) => ({ ...m, id: i, liked: false }))
  const newTracks: Track[] = []
  
  // Create 3 tracks
  for (let i = 0; i < 3; i++) {
    const items: BarrageItem[] = []
    // Shuffle and pick enough items
    const source = [...allMessages].sort(() => Math.random() - 0.5)
    
    // Generate enough items to cover ~2 screens width initially
    // Assuming avg width 200px, 20 items = 4000px
    const count = 20
    for (let j = 0; j < count; j++) {
      const msg = source[j % source.length]
      if (msg) {
        items.push({
          uid: `t${i}-i${j}`,
          data: { ...msg }, // Independent state for duplicated items
          x: 0,
          width: 0,
          hover: false
        })
      }
    }

    newTracks.push({
      items,
      speed: 0.5 + Math.random() * 0.5, // Random speed 0.5 - 1.0
      direction: i % 2 === 0 ? 1 : -1
    })
  }
  tracks.value = newTracks
}

const layoutItems = () => {
  const gap = 30
  tracks.value.forEach((track, i) => {
    // Initial layout
    // For direction 1 (Left): Start from 0 to Right
    // For direction -1 (Right): Start from Right (screenWidth) to Left? 
    // Or just layout linearly and let them move.
    
    let currentX = i % 2 === 0 ? 0 : -200 // Offset for visual variety
    
    track.items.forEach(item => {
      const el = itemRefs.get(item.uid)
      if (el) {
        item.width = el.offsetWidth
      } else {
        item.width = 200 // Fallback
      }
      item.x = currentX
      currentX += item.width + gap
    })
  })
}

const animate = () => {
  if (!props.active) {
    rafId = requestAnimationFrame(animate)
    return
  }

  const screenWidth = window.innerWidth
  const gap = 30

  tracks.value.forEach(track => {
    if (track.direction === 1) {
      // Moving Left (x decreases)
      let maxRight = -Infinity
      
      // First pass: find maxRight
      track.items.forEach(item => {
        const right = item.x + item.width
        if (right > maxRight) maxRight = right
      })

      // Second pass: move and loop
      track.items.forEach(item => {
        if (!item.hover) {
          item.x -= track.speed
        }
        
        // Loop: if completely off left
        if (item.x + item.width < -100) {
           item.x = maxRight + gap
           maxRight += item.width + gap
        }
      })
    } else {
      // Moving Right (x increases)
      let minLeft = Infinity
      
      track.items.forEach(item => {
        if (item.x < minLeft) minLeft = item.x
      })

      track.items.forEach(item => {
        if (!item.hover) {
          item.x += track.speed
        }

        // Loop: if completely off right
        if (item.x > screenWidth + 100) {
           item.x = minLeft - gap - item.width
           minLeft -= (gap + item.width)
        }
      })
    }
  })

  rafId = requestAnimationFrame(animate)
}

onMounted(async () => {
  initTracks()
  await nextTick()
  layoutItems()
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="barrage-container pointer-events-none select-none" aria-hidden="true">
    <div 
      v-for="(track, i) in tracks" 
      :key="i" 
      class="barrage-track"
      :style="{ 
        top: `${15 + i * 25}%`,
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)'
      }"
    >
      <div class="barrage-scroll-container">
        <div 
          v-for="(item, j) in track.items" 
          :key="item.uid"
          :ref="(el) => setItemRef(el, item.uid)"
          class="barrage-item group cursor-pointer pointer-events-auto"
          :class="[item.data.type, { 'liked': item.data.liked, 'z-50': item.hover, 'z-0': !item.hover }]"
          :style="{ transform: `translateX(${item.x}px)` }"
          @mouseenter="item.hover = true"
          @mouseleave="item.hover = false"
          @click="toggleLike(i, j)"
        >
          <span class="mr-2 text-lg transition-transform duration-300 group-hover:scale-125 block" :class="{ 'scale-125': item.data.liked }">
            {{ item.data.liked ? '😊' : item.data.icon }}
          </span>
          <span class="tracking-wide">{{ item.data.text }}</span>
          
          <span 
            v-if="item.data.liked" 
            class="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-bounce shadow-md"
          >
            +1
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.barrage-container {
  @apply absolute inset-0 overflow-hidden;
}

.barrage-track {
  @apply absolute left-0 w-full transition-all duration-1000 ease-out;
  height: 60px; /* fixed height for track */
}

.barrage-scroll-container {
  @apply relative w-full h-full;
}

.barrage-item {
  @apply absolute top-0 left-0 flex items-center px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap
         backdrop-blur-md shadow-sm transition-colors duration-300 border;
  /* Removed transition-all to prevent interfering with JS transform updates */
  will-change: transform;
}

/* Business Style (Blue/Indigo) */
.barrage-item.business {
  @apply bg-blue-50/30 border-blue-100/50 text-blue-700/80;
}
:deep(.dark) .barrage-item.business {
  @apply bg-blue-900/10 border-blue-800/20 text-blue-300/80;
}

/* Tech Style (Purple/Violet) */
.barrage-item.tech {
  @apply bg-purple-50/30 border-purple-100/50 text-purple-700/80;
}
:deep(.dark) .barrage-item.tech {
  @apply bg-purple-900/10 border-purple-800/20 text-purple-300/80;
}

/* Collab Style (Emerald/Teal) */
.barrage-item.collab {
  @apply bg-emerald-50/30 border-emerald-100/50 text-emerald-700/80;
}
:deep(.dark) .barrage-item.collab {
  @apply bg-emerald-900/10 border-emerald-800/20 text-emerald-300/80;
}

/* Liked State */
.barrage-item.liked {
  @apply bg-pink-50/60 border-pink-200/60 text-pink-600 ring-2 ring-pink-100/50;
}
:deep(.dark) .barrage-item.liked {
  @apply bg-pink-900/20 border-pink-500/30 text-pink-300 ring-pink-900/30;
}
</style>
