<template>
  <button 
    :style="buttonStyle" 
    @click="handleClick"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>Click Me</slot>
  </button>
</template>

<script>
export default {
  name: 'MicroButton',
  props: {
    elementId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    buttonStyle() {
      const baseStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease'
      }

      const variantStyles = {
        primary: {
          backgroundColor: '#007bff',
          color: 'white'
        },
        secondary: {
          backgroundColor: '#6c757d',
          color: 'white'
        }
      }

      return {
        ...baseStyle,
        ...variantStyles[this.variant]
      }
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>