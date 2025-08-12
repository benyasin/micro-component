<template></template>

<script lang="ts">
/**
 * 用来替代vue的teleport
 * 因为micro组件的css会被编译到.micro的作用域下，因此直接挂在body下css不生效，需要将body替换成一个带有.micro class的根元素
 */
import { defineComponent, useAttrs, Teleport, h } from 'vue'
import { createElement, isClient } from '@/utils'

let rootElement: Element
const rootElementId = 'MicroTeleport'

export default defineComponent({
  setup(props, { slots }) {
    const attrs = useAttrs()

    const createMicroTeleport = () => {
      rootElement = createElement(rootElementId)
      rootElement.classList.add('micro')
    }

    // 在SSR时不渲染teleport子元素
    if (!isClient) {
      console.warn(
        '<MicroTeleport> cannot be used on the server side. It will be rendered as an empty element. You need to add v-if="isClient" to <MicroTeleport>.'
      )
      return null
    }

    return () => {
      const teleportProps = { ...attrs }
      if (teleportProps.to === 'body' || !teleportProps.to) {
        teleportProps.to = '#' + rootElementId
        if (!rootElement) {
          createMicroTeleport()
        }
      }
      return h(Teleport, teleportProps, slots.default?.())
    }
  }
})
</script>
