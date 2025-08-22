<template>
  <div class="micro-footer" :style="footerStyle">
    <p :style="textStyle">© 2024 Micro Components - Footer Component</p>
    <small :style="smallTextStyle">Powered by Vue 3</small>
  </div>
</template>

<script setup lang="ts">
interface Props {
  elementId?: string
  type?: string
}

defineProps<Props>()

const footerStyle = {
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #ddd',
  textAlign: 'center' as const,
  marginTop: '20px'
}

const textStyle = {
  margin: '0',
  color: '#666'
}

const smallTextStyle = {
  color: '#999'
}
</script>

<style scoped>
.micro-footer {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>