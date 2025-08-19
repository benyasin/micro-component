import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  theme: {
    colors: {
      // 映射到CSS变量，与playground保持一致
      primaryText: 'var(--color-primary-text)',
      secondaryText: 'var(--color-secondary-text)',
      bg: 'var(--color-bg)',
      line: 'var(--color-line)',
    },
    breakpoints: {
      sm: '376px',
      md: '768px', 
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
    }
  }
})
