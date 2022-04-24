import React from "react"
import { User } from "./search-panel"
import { Dropdown, Menu, Table, TableProps } from "antd"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { Pin } from "components/pin"
import { useEditProject } from "../../utils/hooks/project"
import { ButtonNoPadding } from "components/lib"
import { useProjectModal } from "./util"

// ID Should be number
export interface ProjectType {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface Props extends TableProps<ProjectType> {
  users: Array<User>
  refresh?: () => void
}

// type PropType = Omit<Props, 'users'>

export const List: React.FC<Props> = ({ users, ...props }) => {
  const { mutate } = useEditProject()
  const { startEdit } = useProjectModal()
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({
      id,
      pin,
    })
  const editProject = (id: number) => () => startEdit(id)
  return (
    <>
      <Table
        pagination={false}
        // dataSource={list}
        rowKey={"id"}
        columns={[
          {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
              return (
                <Pin
                  checked={project.pin}
                  onCheckedChange={pinProject(project.id)}
                ></Pin>
              )
            },
          },
          {
            title: "名称",
            sorter: (a, b) => {
              return a.name.localeCompare(b.name)
            },
            render(value, project) {
              return <Link to={`${project.id}`}>{project.name}</Link>
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
          {
            render(value, project) {
              return (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key={"edit"}>
                        <ButtonNoPadding
                          type="link"
                          onClick={editProject(project.id)}
                        >
                          编辑
                        </ButtonNoPadding>
                      </Menu.Item>
                      <Menu.Item key={"delete"}>
                        <ButtonNoPadding type="link">删除</ButtonNoPadding>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <ButtonNoPadding type="link">...</ButtonNoPadding>
                </Dropdown>
              )
            },
          },
        ]}
        {...props}
      ></Table>
    </>
  )
}
