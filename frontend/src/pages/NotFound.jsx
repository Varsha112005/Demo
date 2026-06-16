import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { ROUTES } from '../constants/routes'

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start px-4 py-20 sm:px-6 lg:py-28">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-950">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist or has moved.</p>
      <Button as={Link} className="mt-8" to={ROUTES.HOME}>
        Back home
      </Button>
    </section>
  )
}
