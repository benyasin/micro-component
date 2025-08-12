<template>
  <a
    class="logo-item block relative"
    :href="url"
    rel="nofollow"
    target="_blank"
    @click="trackFooterSocialContact(name, url)"
  >
    <img
      class="m-3px w-24px h-24px rounded-1/2"
      :src="iconSrc"
      :title="title"
      :alt="name"
      loading="lazy"
      decoding="async"
    />
    <img
      v-if="iconHoverSrc"
      class="absolute top-0 left-0 m-3px w-24px h-24px rounded-1/2 invisible"
      :src="iconHoverSrc"
      :title="title"
      :alt="name"
      loading="lazy"
      decoding="async"
    />
  </a>
</template>

<script setup lang='ts'>
import { useTrack } from '../useTrack'

const { trackFooterSocialContact } = useTrack() 

defineProps<{
  url: string,
  name: string,
  title: string,
  iconSrc: string,
  iconHoverSrc?: string
}>()

</script>

<style lang='less' scoped>
.logo-item:hover {
  img + img {
    visibility: visible;
  }
}
</style>