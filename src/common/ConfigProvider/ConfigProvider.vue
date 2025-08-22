<template>
  <ConfigProvider :prefixCls="prefixCls" :iconPrefixCls="iconPrefixCls" v-bind="$attrs">
    <slot v-bind="$attrs" />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import { useAttrs, computed } from 'vue'

const attrs = useAttrs()
// 默认使用 mc-ant 作为 Ant Design 的类名前缀，允许外部通过 attrs 覆盖
const prefixCls = computed(() => (attrs.prefixCls as string) || 'mc-ant')
const iconPrefixCls = computed(() => (attrs.iconPrefixCls as string) || 'mc')
</script>

<style lang="less">
.micro-tooltip-popover {
  pointer-events: none;
}
// bit-design reset
.mi-loading-mask {
  --mi-mask-color: transparent;
}
.mi-message__badge {
  display: none;
}
.mi-tabs__active-bar {
  // TODO，先用完整写法避免被主站postcss-dir再次转换
  @apply ltr:!right-initial rtl:!right-initial;
}
.mi-radio-button.is-round {
  background: none !important;
}
// component common style
.micro {
  img {
    // alt color
    @apply text-primaryText;
  }
}
</style>
