// 在真实环境中，使用第三方 auth 服务，本文件不需要开发
import { User } from "./types/user"
const apiUrl = process.env.REACT_APP_API_URL

const localStoragekey = "__auth_provider_token__"

export const getToken = () => window.localStorage.getItem(localStoragekey)
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStoragekey, user.token || "")
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () => {
  window.localStorage.removeItem(localStoragekey)
}
