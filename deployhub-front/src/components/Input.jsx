import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, icon: Icon, error, className = '', containerClassName = '', ...props },
  ref
) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        )}
        <input
          ref={ref}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border ${
            error ? 'border-red-400' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

export default Input
