import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const birthISO = useStorage<string>('birthISO', '')

  function setBirthISO(value: string) {
    birthISO.value = value
  }

  function clearBirthISO() {
    birthISO.value = ''
  }

  return { birthISO, setBirthISO, clearBirthISO }
})