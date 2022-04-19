import React from "react"
import { useAuth } from "context/auth-context"
import { Form, Input } from "antd"
import { LongButton } from "."
import { useAsync } from "../../utils/hooks/useAsync"

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { register } = useAuth()

  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({
    _password,
    ...values
  }: {
    username: string
    password: string
    _password: string
  }) => {
    if (_password !== values.password) {
      onError(new Error("密码输入不一致！"))
      return
    }
    try {
      await run(register(values))
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
      <Form.Item
        name={"_password"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id={"_password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
