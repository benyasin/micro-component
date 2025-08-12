import { EventEmitter } from 'events'
import { defineStore } from '@/utils/store'

export const useGlobalEvent = defineStore(
  () => {
    const event = new EventEmitter()

    return {
      globalEvent: event
    }
  },
  { global: true }
)
