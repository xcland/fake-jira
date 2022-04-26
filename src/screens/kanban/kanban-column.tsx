/* eslint-disable import/no-webpack-loader-syntax */
import React from "react"
import { Kanban } from "../../types/kanban"
import { useTasks } from "../../utils/hooks/task"
import { useTaskModal, useTasksSearchParams } from "./util"
import taskIcon from "!file-loader!assets/task.svg"
import bugIcon from "!file-loader!assets/bug.svg"
import { useTaskTypes } from "../../utils/hooks/task-type"
import styled from "@emotion/styled"
import { Card } from "antd"
import { CreateTask } from "./create-task"

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) return null
  return <img src={name === "task" ? taskIcon : bugIcon} alt={""} />
}

interface KanbanColumnProps {
  kanban: Kanban
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  const { startEdit } = useTaskModal()
  // console.log(tasks)
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={task.id}
          >
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
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
