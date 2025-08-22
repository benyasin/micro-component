<template>
  <div class="micro-footer" :style="footerStyle">
    <p :style="textStyle">© 2024 Micro Components - Footer Component</p>
    <small :style="smallTextStyle">Powered by Vue 2</small>
  </div>
</template>

<script>
export default {
  name: 'MicroFooter',
  props: {
    elementId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      footerStyle: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        marginTop: '20px'
      },
      textStyle: {
        margin: '0',
        color: '#666'
      },
      smallTextStyle: {
        color: '#999'
      }
    }
  }
}
</script>

<style scoped>
.micro-footer {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>