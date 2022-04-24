import React from "react"
import { useAuth } from "context/auth-context"
import { Form, Input } from "antd"
import { LongButton } from "."
import { useAsync } from "../../utils/hooks/useAsync"
// import { useDispatch } from "react-redux"

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  // const dispatch = useDispatch()

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    // dispatch(loginThunk(values))
    try {
      await run(login(values))
    } catch (error: any) {
      onError(error)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
