<template>
  <Popover @show="trackQRCodeExpose" class="w-180px">
    <template #reference>
      <div class="border-0 has-border py-2">
        <div
          class="cursor-pointer leading-18px py-4px px-16px text-primaryText flex flex-row justify-center items-center border-1 has-border"
        >
          <ImgQrcode class="mr-8px" />
          {{ t('common_footer.download_app') }}
        </div>
      </div>
    </template>
    <div class="relative box-border pt-16px pb-20px px-15px w-170px text-center !bg-white">
      <img
        class="w-140px"
        v-if="qrcodeUrl"
        :src="qrcodeUrl"
        alt="qrcode"
        loading="lazy"
        decoding="async"
      />
      <ImgLogoSimple class="absolute w-34px h-34px top-68px left-68px" />
      <div class="text-12px text-center text-blackText">
        {{ $t('common_footer.qrcode_download_app') }}
      </div>
      <div
        class="flex items-center justify-center cursor-pointer min-h-30px mt-8px rounded-99px text-12px !text-white font-500 no-underline leanding-18px break-words bg-[#0D0E0E]"
        @click="open(downloadUrl)"
      >
        {{ $t('common_footer.download_btn_title') }}
      </div>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { getAppDownloadUrl } from '@/utils/utils'
import { useI18n } from '@/compositions/useI18n'
import { useTrack } from './useTrack'
import Popover from './Popover.vue'
import ImgQrcode from '@/assets/footer/download.svg?component'
import ImgLogoSimple from '@/assets/logo-simple.svg?component'

const { trackQRCodeExpose } = useTrack()
const { t, locale } = useI18n()
const qrcodeUrl = ref('')

const downloadUrl = computed(() => getAppDownloadUrl(locale.value))

async function generateQR() {
  const qrcode = await import('qrcode')
  //@ts-ignore
  qrcodeUrl.value = await qrcode.toDataURL(downloadUrl.value, {
    margin: 0,
    width: 154
  })
}

function open(url: string) {
  if (!url) return
  window.open(url, '_blank')
}

onMounted(() => {
  watch(
    locale,
    () => {
      generateQR()
    },
    { immediate: true }
  )
})
</script>

<style scoped lang="less">
.has-border {
  border-radius: 20px;
}
.has-shadow {
  box-shadow: 0 6px 18px 0 #92a0ab33;
}
</style>
