import { useLocation } from "react-router"
import { useProject } from "../../utils/hooks/project"
import { useUrlQueryParam } from "../../utils/hooks/url"
import { useCallback, useMemo } from "react"
import { useTask } from "utils/hooks/task"
import { useDebounce } from "utils/hooks"

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => {
  const projectId = useProjectIdInUrl()
  return useProject(projectId)
}

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"])
  const projectId = useProjectIdInUrl()
  const debouncedName = useDebounce(param.name, 200)
  return useMemo(
    () => ({
      projectId: projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debouncedName,
    }),
    [projectId, param, debouncedName]
  )
}

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()]

// export const useTaskModal = () => {
//   const [editingTaskId, setEditingTaskId] = useUrlQueryParam(["editingTaskId"])
//   const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
//   const startEdit = useCallback(
//     function (id: number) {
//       setEditingTaskId({ editingTaskId: id })
//     },
//     [setEditingTaskId]
//   )
//   const close = useCallback(
//     function () {
//       setEditingTaskId({ editingTaskId: "" })
//     },
//     [setEditingTaskId]
//   )
//   return {
//     editingTaskId,
//     editingTask,
//     startEdit,
//     close,
//     isLoading,
//   }
// }

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId]
  )
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" })
  }, [setEditingTaskId])
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  }
}
