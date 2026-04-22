<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { projects } from '../data/site'
import { useTheme } from '../composables/useTheme'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()
const { toggleTheme } = useTheme()
const searchInput = ref<HTMLInputElement | null>(null)
const query = ref('')
const selectedIndex = ref(0)

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const close = () => {
  isOpen.value = false
  query.value = ''
  selectedIndex.value = 0
}

// Command Items
const items = computed(() => {
  const q = query.value.toLowerCase()
  
  const navigation = [
    { type: 'page', label: 'Home', path: '/', icon: 'home' },
    { type: 'page', label: 'About Me', path: '/about', icon: 'user' },
    { type: 'page', label: 'Projects', path: '/projects', icon: 'folder' },
    { type: 'page', label: 'Contact', path: '/contact', icon: 'mail' },
  ]

  const projectItems = projects.map(p => ({
    type: 'project',
    label: p.name,
    path: '/projects', // Ideally anchor to specific project or separate page
    desc: p.problem,
    icon: 'code'
  }))

  const actions = [
    { type: 'action', label: 'Toggle Dark Mode', action: 'theme', icon: 'moon' },
    { type: 'action', label: 'Copy Email', action: 'copy-email', icon: 'copy' },
  ]

  const all = [...navigation, ...projectItems, ...actions]

  if (!q) return all
  
  return all.filter(item => 
    item.label.toLowerCase().includes(q) || 
    ('desc' in item && (item as any).desc && (item as any).desc.toLowerCase().includes(q))
  )
})

const handleSelect = (item: any) => {
  if (item.type === 'page' || item.type === 'project') {
    router.push(item.path)
  } else if (item.type === 'action') {
    if (item.action === 'theme') {
      toggleTheme()
    } else if (item.action === 'copy-email') {
      navigator.clipboard.writeText('your.email@example.com') // Replace with actual
      alert('Email copied to clipboard!')
    }
  }
  close()
}

const onKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % items.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + items.value.length) % items.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (items.value[selectedIndex.value]) {
      handleSelect(items.value[selectedIndex.value])
    }
  } else if (e.key === 'Escape') {
    close()
  }
}

// Focus input when opened
const onBeforeEnter = () => {
  nextTick(() => {
    searchInput.value?.focus()
  })
}

// Global Keyboard Shortcut
const onGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        onBeforeEnter()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="close"></div>

      <!-- Modal -->
      <div class="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10">
        <!-- Input -->
        <div class="flex items-center border-b border-slate-100 dark:border-slate-800 px-4">
          <svg class="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21L16.65 16.65"></path>
          </svg>
          <input
            ref="searchInput"
            v-model="query"
            type="text"
            class="h-12 w-full border-0 bg-transparent px-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:text-white sm:text-sm"
            placeholder="Search projects, pages, or commands..."
            @keydown.stop="onKeydown"
          />
          <div class="flex items-center gap-1">
             <span class="text-xs font-medium text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">ESC</span>
          </div>
        </div>

        <!-- List -->
        <div class="max-h-[60vh] overflow-y-auto py-2">
          <div v-if="items.length === 0" class="px-4 py-8 text-center text-sm text-slate-500">
            No results found.
          </div>
          
          <ul v-else>
            <li
              v-for="(item, index) in items"
              :key="item.label ? item.label + index : 'item-' + index"
              class="mx-2 cursor-pointer rounded-lg px-4 py-3 text-sm select-none"
              :class="index === selectedIndex ? 'bg-blue-500 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'"
              @click="handleSelect(item)"
              @mousemove="selectedIndex = index"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span :class="index === selectedIndex ? 'text-blue-100' : 'text-slate-400'">
                    <!-- Icons based on type -->
                    <svg v-if="item.icon === 'home'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <svg v-if="item.icon === 'user'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <svg v-if="item.icon === 'folder'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <svg v-if="item.icon === 'mail'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <svg v-if="item.icon === 'code'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    <svg v-if="item.icon === 'moon'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    <svg v-if="item.icon === 'copy'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </span>
                  <span class="font-medium">{{ item.label }}</span>
                </div>
                <span v-if="item.type === 'page'" class="text-xs opacity-50">Jump to</span>
                <span v-if="item.type === 'action'" class="text-xs opacity-50">Action</span>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- Footer -->
        <div class="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div class="flex gap-4">
             <span><kbd class="font-sans font-semibold">↑↓</kbd> to navigate</span>
             <span><kbd class="font-sans font-semibold">↵</kbd> to select</span>
          </div>
          <span class="flex items-center gap-1">
             <span>Cmd+K</span>
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>
