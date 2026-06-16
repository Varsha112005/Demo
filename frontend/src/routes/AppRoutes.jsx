import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { ROUTES } from '../constants/routes'
import { Dashboard } from '../pages/Dashboard'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { Register } from '../pages/Register'
import { VerifyLoginOtp } from '../pages/VerifyLoginOtp'
import { VerifyRegisterOtp } from '../pages/VerifyRegisterOtp'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<Home />} path={ROUTES.HOME} />
        <Route element={<Login />} path={ROUTES.LOGIN} />
        <Route element={<Register />} path={ROUTES.REGISTER} />
        <Route element={<VerifyLoginOtp />} path={ROUTES.VERIFY_LOGIN_OTP} />
        <Route element={<VerifyRegisterOtp />} path={ROUTES.VERIFY_REGISTER_OTP} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />} path={ROUTES.DASHBOARD} />
        </Route>
        <Route element={<Navigate replace to={ROUTES.HOME} />} path="/app" />
        <Route element={<NotFound />} path="*" />
      </Route>
    </Routes>
  )
}
