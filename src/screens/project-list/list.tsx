import React from "react"
import { User } from "./search-panel"
import { Table } from "antd"
import dayjs from "dayjs"

export interface ProjectType {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
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
        rowKey={"id"}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            sorter: (a, b) => {
              return a.name.localeCompare(b.name)
            },
          },
          {
            title: "部门",
            dataIndex: "organization",
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
          {
            title: "创建时间",
            render(value, project) {
              return (
                <span>
                  {project.created
                    ? dayjs(project.created).format("YYYY-MM-DD")
                    : "无"}
                </span>
              )
            },
          },
        ]}
      ></Table>
    </>
  )
}
