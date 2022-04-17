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
        <input
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
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option key={`user-${user.id}`} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
