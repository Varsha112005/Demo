import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-400',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300',
  ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

export function Button({
  as: Component = 'button',
  children,
  className = '',
  disabled,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const componentProps =
    Component === 'button' ? { disabled: disabled || isLoading, type } : {}

  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...componentProps}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Component>
  )
}
