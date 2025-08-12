<template>
  <ConfigProvider>
    <slot v-bind="$attrs" />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
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
