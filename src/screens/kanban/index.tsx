import React from "react"
import { useDocumentTitle } from "../../utils/hooks"
import { useKanbans, useReorderKanban } from "../../utils/hooks/kanban"
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util"
import { KanbanColumn } from "./kanban-column"
import styled from "@emotion/styled"
import { SearchPanel } from "./search-panel"
import { ScreenContainer } from "../../components/lib"
import { useReorderTask, useTasks } from "utils/hooks/task"
import { Spin } from "antd"
import { CreateKanban } from "./create-kanban"
import { TaskModal } from "./task-modal"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Drag, Drop, DropChild } from "components/drag-and-drop"
import { useCallback } from "react"

export const KanbanScreen = () => {
  useDocumentTitle("看板列表")
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  )
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  const onDragEnd = useDragEnd()
  return (
    <DragDropContext
      onDragEnd={(...params) => {
        onDragEnd(params[0])
      }}
    >
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={`kanban${kanban.id}`}
                    index={index}
                  >
                    <KanbanColumn key={kanban.id} kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

export function useDragEnd() {
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())
  const { data: allTasks = [] } = useTasks(useTasksSearchParams())
  return useCallback(
    function ({ source, destination, type }: DropResult) {
      if (!destination) {
        return
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) {
          return
        }
        const type = destination.index > source.index ? "after" : "before"
        reorderKanban({ fromId, referenceId: toId, type })
      }
      if (type === "ROW") {
        const fromKanbanId = Number(source.droppableId)
        const toKanbanId = Number(destination.droppableId)
        if (fromKanbanId === toKanbanId) {
          return
        }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index]
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ]
        if (fromTask === toTask) {
          return
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        })
      }
    },
    [allTasks, kanbans, reorderKanban, reorderTask]
  )
}

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
