import { Loader2 } from 'lucide-react'

export function Loader({ label = 'Loading' }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-slate-600">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
