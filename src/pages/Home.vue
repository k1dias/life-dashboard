<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import { useUserStore } from '../stores/user'

const router = useRouter()
const user = useUserStore()

const dob = ref(user.birthISO) 

const startedAt = ref(Date.now())
const now = ref(Date.now())

useIntervalFn(() => {
  now.value = Date.now()
}, 100)

const secondsOnPage = computed(() => Math.floor((now.value - startedAt.value) / 1000))

// Calculos sol
const kmAroundSun = computed(() => {
  const earthOrbitKmPerSec = 29.78
  return secondsOnPage.value * earthOrbitKmPerSec
})

const formattedKmAroundSun = computed(() => 
  kmAroundSun.value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
)

// Calculos sangue bombeado
const bloodMl = computed(() => {
  const BLOOD_ML_PER_SECOND = 81.67 // ~70ml/batida * 70bpm / 60
  return secondsOnPage.value * BLOOD_ML_PER_SECOND
})
const formattedBloodMl = computed(() =>
  bloodMl.value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
)

// Calculos bebês nascidos no mundo
const babiesBorn = computed(() => {
  const BABIES_BORN_PER_SECOND = 4.3
  return secondsOnPage.value * BABIES_BORN_PER_SECOND
})
const formattedBabiesBorn = computed(() =>
  babiesBorn.value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
)

// Calculos dinheiro gasto no brasil
const brMoneyFlow = computed(() => {
  const BR_GDP_BRL_YEAR = 11_000_000_000_000 // ajuste se quiser (11T BRL placeholder)
  const SECONDS_PER_YEAR = 365 * 24 * 60 * 60
  const brlPerSecond = BR_GDP_BRL_YEAR / SECONDS_PER_YEAR
  return secondsOnPage.value * brlPerSecond
})
const formattedBrMoneyFlow = computed(() =>
  brMoneyFlow.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  })
)

function go() {
  user.setBirthISO(dob.value)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950/20 text-zinc-100">
    <div class="mx-auto max-w-3xl px-4 py-10">
      <!-- Header -->
      <div class="flex flex-col items-center">
        <p class="text-zinc-200">Bem-vindo ao</p>

        <div class="relative mt-1">
          <!-- Glow layer -->
          <h1 class="absolute inset-0 text-6xl font-semibold
            bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400
            bg-clip-text text-transparent
            blur-sm opacity-70">
            Life Wrapped
          </h1>

          <!-- Texto principal -->
          <h1 class="relative text-6xl font-semibold
            bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
            bg-clip-text text-transparent">
            Life Wrapped
          </h1>
        </div>

        <p class="mt-3 text-center text-zinc-200">
          Descubra quantas horas você já viveu, quantas vezes seu coração bateu, o quanto você já viajou pelo universo e muito mais sem sair do lugar.
        </p>
      </div>

      <!-- Form Card -->
      <div class="mt-10">
        <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <!-- sheen / light reflection -->
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rotate-6 bg-gradient-to-r from-purple-500/0 via-white/10 to-cyan-500/0 blur-2xl" />
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
          </div>

          <div class="relative">
            <p class="text-sm font-medium text-zinc-200">Data de nascimento</p>
            <p class="mt-1 text-sm text-zinc-300">
              Só precisamos disso pra calcular seu Life Wrapped.
            </p>

            <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div class="relative w-full">
                <input
                  v-model="dob"
                  type="date"
                  class="peer w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-100 outline-none backdrop-blur-xl
                        placeholder:text-zinc-500
                        focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20"
                />
                <!-- agora funciona porque o input tem class 'peer' -->
                <div class="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300
                            peer-focus:opacity-100 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-cyan-500/15" />
              </div>

              <button
                type="button"
                @click="go"
                class="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white
                      bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500
                      shadow-[0_10px_30px_rgba(168,85,247,0.25)]
                      hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)]
                      transition-all duration-300
                      active:scale-[0.99]"
              >
                <span class="relative z-10">Gerar meu Wrapped</span>
                <span class="ml-2 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">›</span>
                <span class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            <p class="mt-4 text-xs text-zinc-300">
              * Você pode ajustar estimativas (sono, batimentos, etc.) depois.
            </p>
          </div>
        </div>
      </div>

      <!-- Teaser Title -->
      <h2 class="mt-8 text-center text-3xl font-semibold tracking-tight
        bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400
        bg-clip-text text-transparent">
        Desde que você abriu essa página...
      </h2>

      <!-- Teaser Cards Grid -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">

      <!-- Card 1 - Sol -->
      <div class="relative flex flex-col justify-center items-center
                  rounded-3xl border border-white/10 bg-white/5
                  p-6 backdrop-blur-2xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  min-h-[200px] text-center">

        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl" />

        <p class="text-sm text-zinc-300"> Você já percorreu</p>

        <p class="mt-3 text-3xl font-semibold tracking-tight
          bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
          bg-clip-text text-transparent
          drop-shadow-[0_0_22px_rgba(168,85,247,0.35)]">
          {{ formattedKmAroundSun }} km
        </p>

        <p class="mt-2 text-sm text-zinc-300"> Ao redor do Sol ☀️</p>

        <p class="mt-2 text-xs text-zinc-400">
          ~29,78 km por segundo
        </p>
      </div>


      <!-- Card 2 - Sangue -->
      <div class="relative flex flex-col justify-center items-center
                  rounded-3xl border border-white/10 bg-white/5
                  p-6 backdrop-blur-2xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  min-h-[200px] text-center">

        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl" />

        <p class="text-sm text-zinc-300">Seu coração bombeou</p>

        <p class="mt-3 text-3xl font-semibold tracking-tight
          bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
          bg-clip-text text-transparent">
          {{ formattedBloodMl }} ml
        </p>

        <p class="mt-2 text-sm text-zinc-300">De sangue 🫀</p>

        <p class="mt-2 text-xs text-zinc-400">
          *estimativa em repouso
        </p>
      </div>


      <!-- Card 3 - Bebês -->
      <div class="relative flex flex-col justify-center items-center
                  rounded-3xl border border-white/10 bg-white/5
                  p-6 backdrop-blur-2xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  min-h-[200px] text-center">

        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl" />

        <p class="text-sm text-zinc-300">Bebês</p>

        <p class="mt-3 text-3xl font-semibold tracking-tight
          bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
          bg-clip-text text-transparent">
          {{ formattedBabiesBorn }}
        </p>

        <p class="mt-2 text-xs text-zinc-300">
          Nasceram no mundo 👶
        </p>
      </div>


      <!-- Card 4 - Dinheiro -->
      <div class="relative flex flex-col justify-center items-center
                  rounded-3xl border border-white/10 bg-white/5
                  p-6 backdrop-blur-2xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  min-h-[200px] text-center">

        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl" />

        <p class="text-sm text-zinc-300">Foram transacionados</p>

        <p class="mt-3 text-3xl font-semibold tracking-tight
          bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
          bg-clip-text text-transparent">
          {{ formattedBrMoneyFlow }}
        </p>

        <p class="mt-2 text-xs text-zinc-300">
          No Brasli 💸
        </p>
      </div>

      </div>
    </div>
  </div>
</template>