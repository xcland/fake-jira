import { User } from "./search-panel"
import { Table } from "antd"

export interface ProjectType {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
}

interface Props {
  list: Array<ProjectType>
  users: Array<User>
}

export const List: React.FC<Props> = ({ list, users }) => {
  return (
    <>
      <Table
        pagination={false}
        dataSource={list}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            sorter: (a, b) => {
              return a.name.localeCompare(b.name)
            },
          },
          {
            title: "负责人",
            render(value, project) {
              return (
                <span>
                  {users.find((user) => user.id === project.personId)?.name ||
                    "未知"}
                </span>
              )
            },
          },
        ]}
      ></Table>
    </>
  )
}
