import React, { ReactNode, useCallback } from "react"
import * as auth from "auth-provider"
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "utils/hooks"
import { useAsync } from "../utils/hooks/useAsync"
import { FullPageErrorFallback, FullPageLoading } from "../components/lib"
import * as authStore from "store/auth.slice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "store"

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http("me", { token })
    user = data.user
  }
  return user
}

export interface AuthForm {
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
  const { run, error, isLoading, isIdle, isError } = useAsync<User | null>()

  const dispatch: (...args: unknown[]) => Promise<User> =
    useDispatch<AppDispatch>()

  // const login = (form: AuthForm) => auth.login(form).then(setUser)
  // const register = (form: AuthForm) => auth.register(form).then(setUser)
  // const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(dispatch(authStore.bootStrap()) as Promise<User>)
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error as Error} />
  }

  return <div>{children}</div>
}

export const useAuth = () => {
  // const context = React.useContext(AuthContext)
  // if (!context) {
  //   throw new Error("useAuth 必须在 AuthProvider 中使用")
  // }
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(authStore.selectUser)
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  )
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  )
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  const bootstrap = useCallback(
    () => dispatch(authStore.bootStrap()),
    [dispatch]
  )
  return {
    user,
    login,
    register,
    logout,
    bootstrap,
  } as const
}
