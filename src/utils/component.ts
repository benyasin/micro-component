import { useProps } from '@/compositions/useProps'
import { useEvent } from '@/compositions/useEvent'

/**
 * 创建defineExpose需要的数据
 * @param component
 * @param data 自定义导出数据
 */
export function makeExpose(
  component: {
    updateProps: ReturnType<typeof useProps>['updateProps']
    props: ReturnType<typeof useProps>['props'] | ReturnType<typeof useProps>['props']
    event: ReturnType<typeof useEvent>
  },
  data?: Record<string, any>
) {
  return {
    // 低版本兼容
    on: component.event.on,
    ...component,
    ...(data || {})
  }
}

/** 上报组件加载完事件 */
export function dispatchReady(componentName: string) {
  window.dispatchEvent(new CustomEvent('MicroRuntime:ComponentLoaded', { detail: componentName }))
}
