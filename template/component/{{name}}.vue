<template>
  <ConfigProvider>
    <div>{{name}}</div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { createStore } from '@/utils/store'
import { useComponent } from './useComponent'
import { Props } from './types'

import ConfigProvider from '@/common/ConfigProvider/ConfigProvider.vue'

createStore()

const defaultProps = withDefaults(defineProps<Props>(), {
  locale: 'zh_CN'
})
const { rootProps, rootExport } = useComponent(defaultProps)

defineExpose(rootExport)
</script>
