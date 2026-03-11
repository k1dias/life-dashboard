<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import StatCard from '../components/ui/StatCard.vue'

const router = useRouter()
const user = useUserStore()
const startedAt = ref(0)
const elapsedSeconds = ref(0)
const todayISO = new Date().toISOString().split('T')[0]
const CONSTANTS = {
  EARTH_ORBIT_KM_PER_SEC: 29.78,
  BLOOD_ML_PER_SEC: 81.67,
  BABIES_PER_SEC: 4.3,
  BRL_PER_SEC: 11_000_000_000_000 / 31536000
}
const showDobError = computed(() => {
  return !!dob.value && !isDobValid.value
})
let rafId = 0
let lastUpdate = 0

onMounted(() => {
  startedAt.value = performance.now()
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})

function tick(now: number) {
  if (now - lastUpdate >= 100) {
    elapsedSeconds.value = (performance.now() - startedAt.value) / 1000
    lastUpdate = now
  }
  
  rafId = requestAnimationFrame(tick)
}

function go() {
  if (!isDobValid.value) return
  router.push({ name: 'dashboard' })
}

function formatNumber(value: number, fractionDigits = 0) {
  return value.toLocaleString('pt-BR', {
    maximumFractionDigits: fractionDigits
  })
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  })
}

const dob = computed({
  get: () => user.birthISO,
  set: (value: string) => user.setBirthISO(value)
})

const secondsOnPage = computed(() => elapsedSeconds.value)

const kmAroundSun = computed(() => secondsOnPage.value * CONSTANTS.EARTH_ORBIT_KM_PER_SEC)

const bloodMl = computed(() => secondsOnPage.value * CONSTANTS.BLOOD_ML_PER_SEC)

const babiesBorn = computed(() => secondsOnPage.value * CONSTANTS.BABIES_PER_SEC)

const brMoneyFlow = computed(() => secondsOnPage.value * CONSTANTS.BRL_PER_SEC)

const formattedKmAroundSun = computed(() => formatNumber(kmAroundSun.value))

const formattedBloodMl = computed(() => formatNumber(bloodMl.value))

const formattedBabiesBorn = computed(() => formatNumber(babiesBorn.value))

const formattedBrMoneyFlow = computed(() => formatCurrency(brMoneyFlow.value))

const isDobValid = computed(() => {
  if (!dob.value) return false

  const selectedDate = new Date(`${dob.value}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return !Number.isNaN(selectedDate.getTime()) && selectedDate <= today
})

</script>

<template>
  <div class="min-h-screen bg-zinc-950/20 text-zinc-100">
    <div class="mx-auto max-w-3xl px-4 py-10">
      <!-- Header -->
      <div class="flex flex-col items-center">
        <p class="text-zinc-200">Bem-vindo ao</p>

        <div class="relative mt-1">
          <!-- Glow layer -->
          <h1
            class="absolute inset-0 text-6xl font-semibold
            bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400
            bg-clip-text text-transparent
            blur-sm opacity-70"
          >
            Life Wrapped
          </h1>

          <!-- Texto principal -->
          <h1
            class="relative text-6xl font-semibold
            bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
            bg-clip-text text-transparent"
          >
            Life Wrapped
          </h1>
        </div>

        <p class="mt-3 text-center text-zinc-200">
          Descubra quantas horas você já viveu, quantas vezes seu coração bateu, o quanto você já viajou pelo universo e muito mais sem sair do lugar.
        </p>
      </div>

      <!-- Form Card -->
      <div class="mt-10">
        <div
          class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <!-- sheen / light reflection -->
          <div class="pointer-events-none absolute inset-0">
            <div
              class="absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rotate-6 bg-gradient-to-r from-purple-500/0 via-white/10 to-cyan-500/0 blur-2xl"
            />
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
                  :max="todayISO"
                  class="peer w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-100 outline-none backdrop-blur-xl
                        placeholder:text-zinc-500
                        focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20"
                />
                <p
                  v-if="showDobError"
                  class="mt-3 text-xs text-rose-300"
                >
                  Escolha uma data igual ou anterior a hoje.
                </p>
                <div
                  class="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300
                            peer-focus:opacity-100 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-cyan-500/15"
                />
              </div>

              <button
                type="button"
                @click="go"
                :disabled="!isDobValid"
                class="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white
                      bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500
                      shadow-[0_10px_30px_rgba(168,85,247,0.25)]
                      hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)]
                      transition-all duration-300
                      active:scale-[0.99]
                      disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-[0_10px_30px_rgba(168,85,247,0.25)]"
              >
                <span class="relative z-10">Gerar meu Wrapped</span>
                <span class="ml-2 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">›</span>
                <span
                  class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </div>

            <p class="mt-4 text-xs text-zinc-300">
              * Você pode ajustar estimativas (sono, batimentos, etc.) depois.
            </p>
          </div>
        </div>
      </div>

      <!-- Teaser Title -->
      <h2
        class="mt-8 text-center text-3xl font-semibold tracking-tight
        bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400
        bg-clip-text text-transparent"
      >
        Desde que você abriu essa página...
      </h2>

      <!-- Teaser Cards Grid -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <!-- Card 1 - Sol -->
        <StatCard
          title="Você já percorreu"
          subtitle="Ao redor do Sol ☀️"
          footer="~29,78 km por segundo"
        >
          <!-- Overlay extra: órbita -->
          <template #overlay>
            <svg
              class="pointer-events-none absolute inset-0 opacity-90"
              viewBox="0 22 100 70"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                id="orbitPathSun"
                d="M 8 26
                  H 92
                  Q 96 26 96 30
                  V 70
                  Q 96 74 92 74
                  H 8
                  Q 4 74 4 70
                  V 30
                  Q 4 26 8 26"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                stroke-width="0.6"
              />

              <g>
                <circle r="2.8" fill="rgba(34,211,238,0.25)">
                  <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#orbitPathSun" />
                  </animateMotion>
                </circle>

                <circle r="1.7" fill="rgba(34,211,238,0.95)">
                  <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#orbitPathSun" />
                  </animateMotion>
                </circle>

                <circle r="0.6" cx="-0.6" cy="-0.6" fill="rgba(255,255,255,0.9)">
                  <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#orbitPathSun" />
                  </animateMotion>
                </circle>
              </g>
            </svg>
          </template>

          <p
            class="mt-3 text-3xl font-semibold tracking-tight
                  bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_22px_rgba(168,85,247,0.35)]"
          >
            {{ formattedKmAroundSun }} km
          </p>
        </StatCard>

        <!-- Card 2 - Sangue -->
        <StatCard
          title="Seu coração bombeou"
          subtitle="De sangue 🫀"
          footer="*estimativa em repouso"
        >
          <p
            class="mt-3 text-3xl font-semibold tracking-tight
                  bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
                  bg-clip-text text-transparent"
          >
            {{ formattedBloodMl }} ml
          </p>
        </StatCard>

        <!-- Card 3 - Bebês -->
        <StatCard title="Nasceram" subtitle="Bebês no mundo 👶">
          <p
            class="mt-3 text-3xl font-semibold tracking-tight
                  bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
                  bg-clip-text text-transparent"
          >
            {{ formattedBabiesBorn }}
          </p>
        </StatCard>

        <!-- Card 4 - Dinheiro -->
        <StatCard title="Foram transacionados" subtitle="No Brasil 💸">
          <p
            class="mt-3 text-3xl font-semibold tracking-tight
                  bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300
                  bg-clip-text text-transparent"
          >
            {{ formattedBrMoneyFlow }}
          </p>
        </StatCard>
      </div>
    </div>
  </div>
</template>