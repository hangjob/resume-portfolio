<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import CommandPalette from './components/CommandPalette.vue'

const isCmdKOpen = ref(false)
</script>

<template>
  <div class="min-h-screen app-bg">
    <SiteHeader @open-search="isCmdKOpen = true" />
    <main class="container pt-24 pb-12 sm:pt-28 sm:pb-14">
      <RouterView />
    </main>
    <SiteFooter />
    <CommandPalette v-model="isCmdKOpen" />
  </div>
</template>
