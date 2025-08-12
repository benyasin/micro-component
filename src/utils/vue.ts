/**
 * 给reactive重新赋值且保留响应式
 * @param reactive
 * @param value
 */
export function setReactive<T>(reactive: T, value: T) {
  if (Array.isArray(reactive)) {
    // @ts-ignore
    reactive.splice(0, reactive.length, ...value)
    return
  }
  Object.keys(reactive).forEach((key) => delete reactive[key])
  Object.assign(reactive, value)
}
