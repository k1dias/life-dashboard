<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const user = useUserStore()

const birthDate = computed(() => (user.birthISO ? new Date(user.birthISO) : null))
const isValid = computed(() => {
  if (!birthDate.value) return false
  const t = birthDate.value.getTime()
  if (Number.isNaN(t)) return false
  return birthDate.value <= new Date()
})

function back() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <div class="mx-auto max-w-5xl px-4 py-10">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <button
          class="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
          @click="back"
        >
          Voltar
        </button>
      </div>

      <div v-if="!isValid" class="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p class="text-zinc-300">Nenhuma data válida encontrada.</p>
        <p class="mt-1 text-sm text-zinc-400">Volte e selecione sua data de nascimento.</p>
      </div>

      <div v-else class="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p class="text-sm text-zinc-400">Data de nascimento</p>
        <p class="mt-2 text-xl font-semibold">{{ user.birthISO }}</p>

        <p class="mt-6 text-zinc-400">
          Próximo passo: plugar o <code class="text-zinc-200">useLifeStats</code> e renderizar os cards.
        </p>
      </div>
    </div>
  </div>
</template>