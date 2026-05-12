import React from 'react'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props 
}) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-800',
    outline: 'bg-transparent hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <Component 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
