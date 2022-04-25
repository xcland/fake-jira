import { useMemo } from "react"
import { useProject } from "utils/hooks/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/hooks/url"

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

export const useProjectQuerykey = () => {
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ["projects", searchParams]
  return queryKey
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

  const setUrlSearchParam = useSetUrlSearchParam()

  const open = () => setProjectCreate({ projectCreate: true })
  // 无法正常刷新 这是为什么呢
  // const close = () => {
  //   setProjectCreate({ projectCreate: undefined })
  //   setEditingProjectId({ editingProjectId: undefined })
  // }
  const close = () =>
    setUrlSearchParam({ projectCreate: undefined, editingProjectId: undefined })
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
