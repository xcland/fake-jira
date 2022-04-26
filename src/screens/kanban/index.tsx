import React from "react"
import { useDocumentTitle } from "../../utils/hooks"
import { useKanbans } from "../../utils/hooks/kanban"
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util"
import { KanbanColumn } from "./kanban-column"
import styled from "@emotion/styled"
import { SearchPanel } from "./search-panel"
import { ScreenContainer } from "../../components/lib"
import { useTasks } from "utils/hooks/task"
import { Spin } from "antd"
import { CreateKanban } from "./create-kanban"

export const KanbanScreen = () => {
  useDocumentTitle("看板列表")
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  )
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
    </ScreenContainer>
  )
}
export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
