import React from "react"
import { Form, Input, Select } from "antd"
import { ParamType } from "./index"

export interface User {
  id: string
  name: string
  email: string
  title: string
  organiziton: string
  token: string
}

interface Props {
  param: ParamType
  setParam: (
    params: Partial<{
      name: unknown
      personId: unknown
    }>
  ) => void
  users: Array<User>
}

export const SearchPanel: React.FC<Props> = ({ users, param, setParam }) => {
  return (
    <Form
      style={{
        marginBottom: "2rem",
      }}
      layout="inline"
    >
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            })
            console.log(evt.target.value)
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={`user-${user.id}`} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
