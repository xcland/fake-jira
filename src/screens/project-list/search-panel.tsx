import React from "react"
import { Form, Input } from "antd"
import { ProjectType } from "./list"
import { UserSelect } from "components/user-select"
import { User } from "../../types/user"

interface Props {
  param: Partial<Pick<ProjectType, "name" | "personId">>
  setParam: (
    params: Partial<{
      name: unknown
      personId: unknown
    }>
  ) => void
  users: Array<User>
}

export const SearchPanel: React.FC<Props> = ({ param, setParam }) => {
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            })
          }}
        ></UserSelect>
      </Form.Item>
    </Form>
  )
}
