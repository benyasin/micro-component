import { defineStore } from '@/utils'
import { useComponent } from './useComponent'
import { useTrackTool } from '@/compositions/useTrackTool'

/**
 * 埋点
 */
export const useTrack = defineStore(() => {
  const { rootProps } = useComponent()
  const { expose, click } = useTrackTool(rootProps)

  return {
    trackClick() {
      click('params')
    },
    trackExpose() {
      expose('params')
    }
  }
})
