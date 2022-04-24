import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useProject } from "utils/hooks/project"
import { useUrlQueryParam } from "utils/hooks/url"

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"])
  return [
    useMemo(() => {
      const projectsParam = {
        ...param,
        personId: Number(param.personId) || undefined,
      }
      return projectsParam
    }, [param]),
    setParam,
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ])

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ])

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  )

  const [, setUrlParams] = useSearchParams()

  const open = () => setProjectCreate({ projectCreate: true })
  // 无法正常刷新 这是为什么呢
  // const close = () => {
  //   setProjectCreate({ projectCreate: undefined })
  //   setEditingProjectId({ editingProjectId: undefined })
  // }
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" })
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    // projectModalOpen: projectCreate === "true",
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  }
}
