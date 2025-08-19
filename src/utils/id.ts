/**
 * 生成唯一ID的工具函数
 */

// 全局计数器，确保ID的唯一性
let globalCounter = 0

/**
 * 生成唯一的ID
 * @param prefix ID前缀
 * @returns 唯一的ID字符串
 */
export function generateUniqueId(prefix: string = 'id'): string {
  globalCounter++
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `${prefix}_${timestamp}_${globalCounter}_${random}`
}

/**
 * 生成组件实例ID
 * @param type 组件类型
 * @param elementId 元素ID
 * @returns 组件实例ID
 */
export function generateComponentInstanceId(type: string, elementId?: string): string {
  const baseId = elementId || 'element'
  return generateUniqueId(`${type}_${baseId}`)
}

/**
 * 生成microId
 * @param type 组件类型
 * @param instanceId 实例ID
 * @returns microId
 */
export function generateMicroId(type: string, instanceId: string): string {
  return `${type}_${instanceId}`
}

/**
 * 生成React组件key
 * @param microId microId
 * @param instanceId 实例ID
 * @returns React组件key
 */
export function generateReactKey(microId: string, instanceId: string): string {
  return `${microId}_${instanceId}`
}
