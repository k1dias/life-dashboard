<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  title?: string
  subtitle?: string
  footer?: string
  icon?: string
  minHeightClass?: string
  center?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  footer: '',
  icon: '',
  minHeightClass: 'min-h-[200px]',
  center: true
})

const containerClass = computed(() => {
  const base =
    'relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
  const align = props.center ? 'text-center flex flex-col items-center justify-center' : ''
  return `${base} ${props.minHeightClass} ${align}`
})
</script>

<template>
  <div :class="containerClass">
    <!-- Background overlay (glass aurora) -->
    <div class="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />

    <!-- Optional extra overlay (orbit, glow, etc.) -->
    <slot name="overlay" />

    <!-- Content -->
    <div class="relative w-full">
      <div v-if="title || subtitle || icon" class="mb-3">
        <p v-if="title" class="text-sm text-zinc-300">
          <span v-if="icon" class="mr-1">{{ icon }}</span>{{ title }}
        </p>
      </div>

      <!-- Main value -->
      <div>
        <slot />
      </div>

      <p v-if="subtitle" class="mt-1 text-sm text-zinc-300/80">
        {{ subtitle }}
      </p>

      <!-- Footer -->
      <p v-if="footer" class="mt-3 text-xs text-zinc-400">
        {{ footer }}
      </p>
    </div>
  </div>
</template>