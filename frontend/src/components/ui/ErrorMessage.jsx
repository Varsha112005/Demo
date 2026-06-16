import { AlertCircle } from 'lucide-react'

export function ErrorMessage({ message = 'Unable to load this content.' }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
