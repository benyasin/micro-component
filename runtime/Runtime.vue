<template>
  <div>
    <Teleport
      v-for="component in components"
      :to="component.container || `#${component.elementId}`"
      :key="component.microId"
    >
      <Component
        v-bind="component.props"
        :is="component.component"
        :key="component.microId"
        :ref="(el) => setInstance(component, el)"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { createStore } from '@/utils/store'
import { useI18n } from '@/compositions/useI18n'
import { components } from './runtime'

createStore()
useI18n()

function setInstance(component, instance) {
  component.instance = instance
}
</script>
