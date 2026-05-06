import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center gap-2
    font-black rounded-3xl transition-all duration-150
    select-none cursor-pointer active:scale-95
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[52px]',
    lg: 'px-8 py-4 text-lg min-h-[60px]',
  }

  const variants = {
    primary:   'bg-kazakh-gold text-deep-navy shadow-glow-gold hover:brightness-110',
    secondary: 'bg-sky-blue/20 text-sky-blue border-2 border-sky-blue hover:bg-sky-blue/30',
    ghost:     'glass text-white border border-white/20 hover:border-white/40',
    danger:    'bg-candy-pink text-white shadow-glow-pink hover:brightness-110',
  }

  return (
    <motion.button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}
