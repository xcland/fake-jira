/* eslint-disable import/no-webpack-loader-syntax */
import React from "react"
import { Kanban } from "../../types/kanban"
import { useTasks } from "../../utils/hooks/task"
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util"
import taskIcon from "!file-loader!assets/task.svg"
import bugIcon from "!file-loader!assets/bug.svg"
import { useTaskTypes } from "../../utils/hooks/task-type"
import styled from "@emotion/styled"
import { Button, Card, Dropdown, Menu, Modal } from "antd"
import { CreateTask } from "./create-task"
import { Task } from "types/task"
import { Mark } from "components/mark"
import { useDeleteKanban } from "utils/hooks/kanban"
import { Row } from "components/lib"

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) return null
  return <img src={name === "task" ? taskIcon : bugIcon} alt={""} />
}

interface KanbanColumnProps {
  kanban: Kanban
}

function TaskCard({ task }: { task: Task }) {
  const { startEdit } = useTaskModal()
  const { name: keyword } = useTasksSearchParams()
  // console.log(keyword)
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  // console.log(tasks)
  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task, index) => (
          <TaskCard key={`${task}-${index}`} task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  )
}

function More({ kanban }: { kanban: Kanban }) {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除该看板吗？",
      onOk() {
        return mutateAsync({ id: kanban.id })
      },
    })
  }
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`
