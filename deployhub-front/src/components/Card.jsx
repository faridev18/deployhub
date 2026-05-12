import React from 'react'

export default function Card({ 
  children, 
  variant = 'default',
  hover = false,
  className = '' 
}) {
  const baseClasses = 'rounded-lg p-6'
  
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    gradient: 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg',
    ghost: 'bg-gray-50 border border-gray-100'
  }
  
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : ''
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  )
}
