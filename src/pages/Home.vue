<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const user = useUserStore()

const dob = ref(user.birthISO) // começa com o que já está salvo

function go() {
  user.setBirthISO(dob.value)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <div class="mx-auto max-w-3xl px-4 py-10">
      <h1 class="text-3xl font-semibold">Life Dashboard</h1>
      <p class="mt-2 text-zinc-400">Insira sua data de nascimento para gerar as estatísticas.</p>

      <div class="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <label class="block text-sm text-zinc-300">Data de nascimento</label>
        <div class="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            v-model="dob"
            type="date"
            class="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
          />
          <button
            type="button"
            @click="go"
            class="rounded-xl bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
          >
            Gerar dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>