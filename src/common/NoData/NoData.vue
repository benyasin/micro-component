<template>
  <div class="flex flex-col items-center justify-center py-20px">
    <Component :is="img || ImgNodata" />
    <span class="mt-16px text-thirdText">
      <slot>{{ t('common.no_data') }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { FunctionalComponent } from 'vue'
import { useI18n } from '@/compositions/useI18n'
import ImgNodata from '@/assets/no-data.svg?component'

defineProps<{
  img?: FunctionalComponent
}>()

const { t } = useI18n()
</script>
