import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(true)

  return (
    <>
      {isRegister ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "注册" : "登录"}
      </button>
    </>
  )
}
