import { defineStore } from '@/utils'
import { useComponent as useComp } from '@/compositions/useComponent'
import { Props, Events } from './types'

export const useComponent = defineStore((defaultProps?: Props) => {
  const { rootProps, event, rootExport } = useComp<Props, Events>(defaultProps, '{{name}}')

  return {
    rootProps,
    event,
    rootExport
  }
})
