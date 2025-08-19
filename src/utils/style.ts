/**
 * ProTable 样式工具函数
 * 使用 CSS 变量和内联样式，确保在无 UnoCSS 环境下正常工作
 */

export interface ProTableStyles {
  container: Record<string, string>
  filter: Record<string, string>
  operation: Record<string, string>
  table: Record<string, string>
  header: Record<string, string>
  row: Record<string, string>
  cell: Record<string, string>
  pagination: Record<string, string>
  button: Record<string, string>
  input: Record<string, string>
  select: Record<string, string>
}

/**
 * 创建 ProTable 默认样式
 */
export const createProTableStyles = (): ProTableStyles => {
  return {
    container: {
      backgroundColor: 'var(--color-bg, #ffffff)',
      border: '1px solid var(--color-line, #e5e5e5)',
      borderRadius: '8px',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    filter: {
      backgroundColor: 'var(--color-card-bg, #f8f9fa)',
      border: '1px solid var(--color-line, #e5e5e5)',
      borderRadius: '6px',
      padding: '16px',
      marginBottom: '16px'
    },
    operation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      padding: '8px 0'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'var(--color-bg, #ffffff)',
      border: '1px solid var(--color-line, #e5e5e5)',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: 'var(--color-card-bg, #f8f9fa)',
      color: 'var(--color-primary-text, #1a1a1a)',
      fontWeight: '600',
      fontSize: '14px',
      padding: '12px 16px',
      borderBottom: '1px solid var(--color-line, #e5e5e5)',
      textAlign: 'left'
    },
    row: {
      borderBottom: '1px solid var(--color-line, #e5e5e5)',
      transition: 'background-color 0.2s ease'
    },
    cell: {
      padding: '12px 16px',
      fontSize: '14px',
      color: 'var(--color-primary-text, #1a1a1a)',
      borderBottom: '1px solid var(--color-line, #e5e5e5)'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '16px',
      gap: '8px'
    },
    button: {
      backgroundColor: 'var(--color-primary-btn-bg, #1890ff)',
      color: 'var(--color-white-text, #ffffff)',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    input: {
      border: '1px solid var(--color-line, #e5e5e5)',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '14px',
      backgroundColor: 'var(--color-bg, #ffffff)',
      color: 'var(--color-primary-text, #1a1a1a)'
    },
    select: {
      border: '1px solid var(--color-line, #e5e5e5)',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '14px',
      backgroundColor: 'var(--color-bg, #ffffff)',
      color: 'var(--color-primary-text, #1a1a1a)',
      cursor: 'pointer'
    }
  }
}

/**
 * 合并样式对象
 */
export const mergeStyles = (
  baseStyles: Record<string, string>,
  customStyles?: Record<string, string>
): Record<string, string> => {
  if (!customStyles) return baseStyles
  return { ...baseStyles, ...customStyles }
}

/**
 * 创建悬停样式
 */
export const createHoverStyles = (baseColor: string) => ({
  backgroundColor: `${baseColor}10`,
  cursor: 'pointer'
})

/**
 * 创建禁用样式
 */
export const createDisabledStyles = () => ({
  opacity: '0.6',
  cursor: 'not-allowed',
  pointerEvents: 'none'
})
