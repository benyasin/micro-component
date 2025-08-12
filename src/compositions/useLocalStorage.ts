import { onMounted, ref, reactive } from 'vue'
import { isClient } from '@/utils'

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const cache = ref<T>()

  const getCache = () => {
    if (!isClient) return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}"`, e)
      return initialValue
    }
  }

  const setCache = (value) => {
    if (!isClient) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      )
    }

    try {
      const newValue = value instanceof Function ? value(cache.value) : value

      window.localStorage.setItem(key, JSON.stringify(newValue))

      cache.value = newValue
    } catch (e) {
      console.warn(`Error setting localStorage key “${key}”:`, e)
    }
  }

  const clearCache = () => {
    if (!isClient) {
      console.warn(`Tried clear localStorage even though environment is not a client`)
    }
    window.localStorage.removeItem(key)
    cache.value = null
  }

  if (isClient) {
    cache.value = getCache()
  }

  return {
    cache,
    setCache,
    clearCache
  }
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.error('parsing error on', { value })
    return undefined
  }
}
