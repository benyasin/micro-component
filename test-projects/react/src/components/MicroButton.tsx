import React from 'react'

interface MicroButtonProps {
  elementId?: string
  type?: string
  children?: React.ReactNode
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary'
  [key: string]: any
}

const MicroButton: React.FC<MicroButtonProps> = ({ 
  children = 'Click Me', 
  onClick, 
  variant = 'primary',
  elementId,
  type: _type,
  ...props 
}) => {
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

  return (
    <button 
      style={{ ...baseStyle, ...variantStyles[variant] }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default MicroButton