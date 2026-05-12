import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authApi } from '../api/auth'
import { tokenStorage } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    if (!tokenStorage.get()) {
      setUser(null)
      return null
    }
    try {
      const me = await authApi.me()
      setUser(me)
      return me
    } catch {
      tokenStorage.clear()
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [refreshUser])

  const login = async (identifier, password) => {
    const { access_token } = await authApi.login({
      username: identifier,
      password,
    })
    tokenStorage.set(access_token)
    return refreshUser()
  }

  const register = async (data) => {
    return authApi.register(data)
  }

  const logout = () => {
    tokenStorage.clear()
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
