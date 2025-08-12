import { onMounted, onScopeDispose, ref } from 'vue'
import { debounce } from 'lodash-es'
import { defineStore, isClient } from '@/utils'

export const useSize = defineStore(
  function () {
    const winWidth = ref(isClient ? window.innerWidth : 1280)
    const winHeight = ref(isClient ? window.innerHeight : 768)

    const onResize = debounce(() => {
      winWidth.value = window.innerWidth
      winHeight.value = window.innerHeight
    }, 600)

    onMounted(() => {
      window.addEventListener('resize', onResize)
    })
    onScopeDispose(() => {
      window.removeEventListener('resize', onResize)
    })

    return {
      winWidth,
      winHeight
    }
  },
  { global: true }
)
