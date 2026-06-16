import { useCallback, useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { tokenStorage } from '../utils/tokenStorage'
import { AuthContext } from './AuthContextObject'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => tokenStorage.getToken())
  const [user, setUser] = useState(() => tokenStorage.getUser())
  const [isLoading, setIsLoading] = useState(false)

  const saveSession = useCallback(({ token: nextToken, user: nextUser }) => {
    tokenStorage.setToken(nextToken)
    tokenStorage.setUser(nextUser)
    setToken(nextToken)
    setUser(nextUser)
  }, [])

  const register = useCallback(async (payload) => {
    setIsLoading(true)

    try {
      const { data } = await authService.register(payload)
      return data
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyRegisterOtp = useCallback(async (payload) => {
    setIsLoading(true)

    try {
      const { data } = await authService.verifyRegisterOtp(payload)
      saveSession(data)
      return data
    } finally {
      setIsLoading(false)
    }
  }, [saveSession])

  const login = useCallback(async (payload) => {
    setIsLoading(true)

    try {
      const { data } = await authService.login(payload)
      return data
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyLoginOtp = useCallback(async (payload) => {
    setIsLoading(true)

    try {
      const { data } = await authService.verifyLoginOtp(payload)
      saveSession(data)
      return data
    } finally {
      setIsLoading(false)
    }
  }, [saveSession])

  const refreshProfile = useCallback(async () => {
    const { data } = await authService.getCurrentUser()
    tokenStorage.setUser(data.user)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    tokenStorage.clear()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
      refreshProfile,
      register,
      user,
      verifyLoginOtp,
      verifyRegisterOtp,
    }),
    [isLoading, login, logout, refreshProfile, register, token, user, verifyLoginOtp, verifyRegisterOtp],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
