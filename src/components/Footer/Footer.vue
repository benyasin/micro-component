<template>
  <ConfigProvider>
    <div class="bg-bgPrimary micro-app-hide min-h-50px">
      <div
        ref="$footer"
        pc="mx-auto max-w-1200px pt-60px"
        lt-pc="px-30px"
        ipad="px-30px"
        lt-ipad="px-4"
      >
        <Logo class="overflow-hidden pt-50px logo-bl" pc="hidden" lt-pc="inline-block" />
        <div
          class="flex-none copyright !ml-0 text-primaryText relative overflow-hidden text-fs12 leading-18px"
          at-ipad="mb-10"
          pc="hidden"
        >
          Trade smarter
        </div>
        <div
          class="box-border relative w-full overflow-hidden"
          :pc="config?.rtlSupport ? 'flex justify-between space-x-30px min-h-540px mb-35px rtl:space-x-reverse' : 'flex justify-between space-x-30px min-h-540px mb-35px'"
        >
          <Community v-if="winWidth >= 768" at-ipad="hidden" lt-ipad="hidden" />
          <Nav />
        </div>
        <Community pc="hidden" />
        <Copyright />
      </div>
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect, ref } from 'vue'
import { createStore } from '@/utils/store'
import { makeExpose, dispatchReady } from '@/utils/component'
import { useSize } from '@/compositions/useSize'
import { useFooter } from './useFooter'
import { useTrack } from './useTrack'
import { Props } from './types'
import ConfigProvider from '@/common/ConfigProvider/ConfigProvider.vue'
import Copyright from './Copyright.vue'
import Nav from './Nav.vue'
import Community from './Community.vue'
import Logo from './Logo.vue'

createStore()

const defaultProps = withDefaults(defineProps<Props>(), {
  currencyVisible: true
})

const $footer = ref()
const { config, footerProps, updateProps, event } = useFooter(defaultProps)
const { trackExposeFooter } = useTrack()
const { winWidth } = useSize()

onMounted(() => {
  if ($footer.value) {
    trackExposeFooter($footer.value)
  }
})

watchEffect(() => {
  // 在移动端通过CSS默认隐藏，需要在此重新显示
  if ($footer.value) {
    // 低版本兼容
    $footer.value.parentElement.classList.add('micro')
  }
})

// 组件加载完上报事件
onMounted(() => {
  dispatchReady('Footer')
})

defineExpose(
  makeExpose({
    event,
    updateProps,
    props: footerProps
  })
)
</script>

<style scoped lang="less">
// 为了SSG时可以显示正确的Logo，这里用CSS来控制深浅Logo的显示，不能动态拼接src
.logo {
  @apply hidden w-132px h-54px !rtl:rotate-y-0;
}
.logo-light {
  @apply inline-block;
}
</style>
