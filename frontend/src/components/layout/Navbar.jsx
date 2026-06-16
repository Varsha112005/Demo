import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:text-slate-950'
  }`

export function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const appName = import.meta.env.VITE_APP_NAME || 'Auth Demo App'

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-lg font-semibold text-slate-950" to={ROUTES.HOME}>
          <ShieldCheck className="h-6 w-6 text-cyan-700" />
          {appName}
        </Link>

        <div className="flex items-center gap-2">
          <NavLink className={navLinkClass} to={ROUTES.HOME}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink className={navLinkClass} to={ROUTES.DASHBOARD}>
                <LayoutDashboard className="mr-1 inline h-4 w-4" />
                Dashboard
              </NavLink>
              <Button onClick={logout} size="sm" variant="ghost">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink className={navLinkClass} to={ROUTES.LOGIN}>
                Login
              </NavLink>
              <Button as={Link} size="sm" to={ROUTES.REGISTER}>
                Register
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
