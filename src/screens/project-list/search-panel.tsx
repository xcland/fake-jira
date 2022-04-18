import { Input, Select } from "antd"
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
  setParam: React.Dispatch<React.SetStateAction<ParamType>>
  users: Array<User>
}

export const SearchPanel: React.FC<Props> = ({ users, param, setParam }) => {
  return (
    <form>
      <div>
        <Input
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
            <Select.Option key={`user-${user.id}`} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  )
}
