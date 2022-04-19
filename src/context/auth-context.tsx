import React, { ReactNode } from "react"
import * as auth from "auth-provider"
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "utils/hooks"
import { useAsync } from "../utils/hooks/useAsync"
import { FullPageErrorFallback, FullPageLoading } from "../components/lib"

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http("me", { token })
    user = data.user
  }
  return user
}

interface AuthForm {
  username: string
  password: string
}

interface ContextType {
  user: User | null
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<ContextType | undefined>(undefined)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    setData: setUser,
  } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error as Error} />
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用")
  }
  return context
}
