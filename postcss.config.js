export default {
  plugins: {
    'postcss-prefix-selector': {
      prefix: '.micro', // 给所有 class 前缀一个 .micro
      transform(prefix, selector, prefixedSelector) {
        // 只处理 ant-design-vue 的类名
        if (selector.startsWith('.ant-')) {
          return selector.replace(/^\.ant-/, '.mc-ant-')
        }
        return selector
      }
    }
  }
}
