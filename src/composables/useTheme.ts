import { ref, watchEffect } from 'vue'

export type ThemeMode = 'light' | 'dark'

const theme = ref<ThemeMode>('light')

const detectTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('theme') as ThemeMode | null
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Initialize
theme.value = detectTheme()

const toggleTheme = () => {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = next
}

// Effect to apply theme
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme.value
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme.value)
  }
})

export function useTheme() {
  return {
    theme,
    toggleTheme
  }
}
