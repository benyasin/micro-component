import { watch, onMounted } from 'vue'
import { defineStore } from '@/utils/store'
import { makeExpose, dispatchReady } from '@/utils/component'
import { useI18n } from '@/compositions/useI18n'
import { useProps } from './usePropsNew'
import { useEvent } from './useEvent'
import { BaseProps } from '@/types/component'

/**
 * 解析根组件的 props、event、slot、expose
 */
export const useComponent = defineStore(
  <
    Props extends BaseProps,
    Event extends Record<string | number | symbol, (...args: any[]) => any> = Record<
      string | number | symbol,
      (...args: any[]) => any
    >
  >(
    defaultProps?: Props,
    componentName?: string
  ) => {
    const { changeLocale } = useI18n()
    const { props, updateProps } = useProps<Props>(defaultProps)
    const event = useEvent<Event>()
    const rootExport = makeExpose({
      updateProps,
      props,
      event
    })

    // 切换语言
    watch(
      () => props.locale,
      (locale) => {
        if (locale) {
          changeLocale(locale)
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (componentName) {
        dispatchReady(componentName)
      }
    })

    return {
      rootProps: props,
      event,
      rootExport
    }
  }
)
