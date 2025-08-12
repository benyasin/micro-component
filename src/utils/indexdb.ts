import localforage from 'localforage'

export function createIndexdb(storeName: string) {
  let indexdb: LocalForage
  try {
    indexdb = localforage.createInstance({
      name: 'micro',
      storeName,
      driver: localforage.INDEXEDDB,
      version: 1
    })
  } catch (e) {
    console.warn('localForage initialization failed: ', e)
  }

  return {
    async find<T>(key) {
      try {
        const value = await indexdb.getItem<T>(key)
        return value || undefined
      } catch {
        return undefined
      }
    },
    async set(key, value) {
      try {
        await indexdb.setItem(key, value)
      } catch {}
    },
    async remove(key) {
      try {
        await indexdb.removeItem(key)
      } catch {}
    },
    async iterate(cb: (value, key) => void) {
      try {
        return await indexdb.iterate(function (value, key) {
          cb(value, key)
        })
      } catch {}
    }
  }
}

export const axiosCacheStorage = createIndexdb('axios-cache')
export const md5CacheStorage = createIndexdb('md5-cache')
