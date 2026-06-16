import { format } from 'date-fns'

export const formatReadableDate = (date, pattern = 'PPP') => {
  if (!date) return ''

  return format(new Date(date), pattern)
}
