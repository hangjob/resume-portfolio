<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Project } from '../data/site'

const props = defineProps<{ project: Project }>()

const coverImage = computed(() => props.project.images?.[0] ?? props.project.cover)

const tilt = ref({ x: 0, y: 0 })
const hovering = ref(false)

const onPointerMove = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return
  const el = event.currentTarget as HTMLElement | null
  if (!el) return
  const rect = el.getBoundingClientRect()
  const dx = (event.clientX - rect.left) / rect.width
  const dy = (event.clientY - rect.top) / rect.height
  tilt.value = {
    x: (dx - 0.5) * 2,
    y: (dy - 0.5) * 2,
  }
  hovering.value = true
}

const onPointerLeave = () => {
  hovering.value = false
  tilt.value = { x: 0, y: 0 }
}

const parallaxStyle = computed<Record<string, string>>(() => {
  const x = tilt.value.x
  const y = tilt.value.y
  return {
    '--px': String(x),
    '--py': String(y),
    '--hx': `${50 + x * 18}%`,
    '--hy': `${50 + y * 18}%`,
    '--hopacity': hovering.value ? '1' : '0',
  }
})

const statusBadgeStyle = (status: Project['status']): Record<string, string> => {
  const tone = (() => {
    switch (status) {
      case 'Active':
        return '--status-active'
      case 'Maintained':
        return '--status-maintained'
      case 'Paused':
        return '--status-paused'
      case 'Archived':
        return '--status-archived'
      default:
        return '--status-archived'
    }
  })()

  return {
    borderColor: `rgb(var(${tone}) / 0.35)`,
    backgroundColor: `rgb(var(${tone}) / 0.12)`,
    color: `rgb(var(${tone}))`,
  }
}
</script>

<template>
  <div
    class="surface card-parallax p-6"
    :style="parallaxStyle"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div>
      <div class="flex items-start justify-between gap-4">
        <div class="flex min-w-0 items-start gap-4">
          <div
            class="card-parallax-media shrink-0 overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]"
          >
            <div class="h-14 w-14">
              <img
                v-if="coverImage?.src"
                :src="coverImage.src"
                :alt="coverImage.alt ?? project.name"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgb(var(--accent)/0.22),transparent_62%),radial-gradient(circle_at_bottom,rgb(var(--accent-2)/0.18),transparent_62%)]"
              >
                <div class="text-xs font-semibold text-[rgb(var(--fg))]">{{ project.name.slice(0, 2) }}</div>
              </div>
            </div>
          </div>

          <div class="min-w-0">
            <div class="truncate text-base font-semibold text-[rgb(var(--fg))]">{{ project.name }}</div>
            <div class="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{{ project.problem }}</div>
          </div>
        </div>

        <div
          v-if="project.openSource || project.status === 'Paused' || project.status === 'Archived'"
          class="shrink-0 flex items-center gap-2"
        >
          <span
            v-if="project.openSource"
            class="stamp"
          >
            <span>开源</span>
          </span>
          <span
            v-if="project.status === 'Paused' || project.status === 'Archived'"
            class="rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide"
            :style="statusBadgeStyle(project.status)"
          >
            {{ project.status }}
          </span>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="item in project.stack"
          :key="item"
          class="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-2.5 py-1 text-[11px] font-semibold text-[rgb(var(--muted))]"
        >
          {{ item }}
        </span>
      </div>

      <ul
        v-if="project.highlights?.length"
        class="mt-6 list-disc space-y-2 pl-5 text-sm text-[rgb(var(--muted))] marker:text-[rgb(var(--muted-2))]"
      >
        <li v-for="item in project.highlights" :key="item">{{ item }}</li>
      </ul>

      <div v-if="project.links?.length" class="mt-6 flex flex-wrap gap-3 text-sm">
        <a
          v-for="link in project.links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
          class="btn btn-ghost text-xs"
        >
          {{ link.label }}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="text-[rgb(var(--muted-2))]"
            aria-hidden="true"
          >
            <path
              d="M14 4h6v6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 14 20 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 14v5H5V4h5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
