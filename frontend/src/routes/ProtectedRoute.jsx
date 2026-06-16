import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { Loader } from '../components/ui/Loader'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <Loader label="Checking session" />
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />
  }

  return <Outlet />
}
