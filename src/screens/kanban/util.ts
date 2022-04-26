import { useLocation } from "react-router"
import { useProject } from "../../utils/hooks/project"
import { useUrlQueryParam } from "../../utils/hooks/url"
import { useMemo } from "react"

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
  return useMemo(
    () => ({
      projectId: projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  )
}

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()]
