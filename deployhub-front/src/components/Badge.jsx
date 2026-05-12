import React from 'react'

export default function Badge({ 
  children, 
  status = 'default',
  showDot = false,
  className = '' 
}) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium'
  
  const statuses = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-emerald-100 text-emerald-700',
    running: 'bg-green-100 text-green-700',
    stopped: 'bg-gray-100 text-gray-700',
    building: 'bg-emerald-100 text-emerald-700'
  }
  
  const dotColors = {
    default: 'bg-gray-400',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-emerald-500',
    running: 'bg-green-500',
    stopped: 'bg-gray-400',
    building: 'bg-emerald-500 animate-pulse'
  }
  
  return (
    <span className={`${baseClasses} ${statuses[status]} ${className}`}>
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${dotColors[status]}`}></span>
      )}
      {children}
    </span>
  )
}
