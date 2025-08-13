import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import type { UserConfig } from '@unocss/core'

const config: UserConfig = {
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetUno({
      dark: {
        dark: '.micro-dark',
        light: '.micro-light'
      }
    }),
    presetAttributify()
  ],
  theme: {
    // 初始化默认主题
    darkMode: {
      dark: '.micro-dark',
      light: '.micro-light'
    },
    colors: {
      // 实际使用的颜色变量 - Footer 组件和 playground 所需
      primary: 'var(--color-primary)',
      error: 'var(--color-error)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      
      // 字体颜色 - 实际使用
      primaryText: 'var(--color-primary-text)',
      secondaryText: 'var(--color-secondary-text)',
      thirdText: 'var(--color-third-text)',
      
      // 背景颜色 - 实际使用  
      bg: 'var(--color-bg)',
      cardBg: 'var(--color-card-bg)',
      
      // 线条颜色
      line: 'var(--color-line)',
    },
    boxShadow: {
      DEFAULT: '2px 4px 6px 2px rgba(171, 188, 203, 0.12)',
    },
    // tailwind 中的 screens，unocss使用breakpoints
    breakpoints: {
      sm: '376px',
      md: '768px', 
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
    },
    screens: {
      // 基本编排 - 保留标准断点
      sm: '376px',
      md: '768px',
      lg: '1020px', 
      xl: '1200px',
      '2xl': '1440px',
    },
    fontSize: {
      // 保留 Footer 组件可能用到的字体大小
      fs12: ['0.75rem', '18px'],
      fs14: ['0.875rem', '22px'],
      fs16: ['1rem', '22px'],
      fs18: ['1.125rem', '26px'],
      fs20: ['1.25rem', '28px'],
      fs24: ['1.5rem', '34px'],
      fs26: ['1.625rem', '34px'],
      fs28: ['1.75rem', '34px'],
      fs30: ['1.875rem', '34px'],
      fs32: ['2rem', '44px'],
      fs34: ['2.125rem', '44px'],
      fs36: ['2.25rem', '44px'],
      fs38: ['2.375rem', '44px'],
      fs40: ['2.5rem', '54px'],
      fs42: ['2.625rem', '54px'],
      fs44: ['2.75rem', '54px'],
      fs46: ['2.875rem', '54px'],
      fs48: ['3rem', '66px'],
      fs50: ['3.125rem', '66px'],
      fs52: ['3.25rem', '66px'],
      fs54: ['3.375rem', '66px'],
      fs56: ['3.5rem', '76px'],
      fs58: ['3.625rem', '76px'],
      fs60: ['3.75rem', '76px'],
      fs62: ['3.875rem', '76px'],
      fs64: ['4rem', '76px'],
      fs66: ['4.125rem', '76px'],
      fs72: ['4.5rem', '98px']
    }
  }
}

export default config
