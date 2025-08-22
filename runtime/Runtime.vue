<template>
  <div>
    <Teleport
      v-for="component in components"
      :to="component.container || `#${component.elementId}`"
      :key="component.microId"
    >
      <ConfigProvider :prefixCls="'mc-ant'" :iconPrefixCls="'mc'" :getPopupContainer="(triggerNode: any) => getPopupContainer(component, triggerNode)">
        <Component
          v-bind="component.props"
          :is="component.component"
          :key="component.microId"
          :ref="(el) => setInstance(component, el)"
        />
      </ConfigProvider>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { createStore } from '@/utils/store'
import { useI18n } from '@/compositions/useI18n'
import { components } from './runtime'
import ConfigProvider from '@/common/ConfigProvider/ConfigProvider.vue'

createStore()
useI18n()

const rootDoc: Document | undefined = typeof document !== 'undefined' ? document : undefined

function setInstance(component: any, instance: any) {
  component.instance = instance
}

function getPopupContainer(component: any, triggerNode?: any) {
  return component?.container || triggerNode?.parentNode || rootDoc?.body
}
</script>
