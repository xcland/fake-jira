import { useMemo } from "react"
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

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setProjectCreate({ projectCreate: undefined })

  return { projectModalOpen: projectCreate === "true", open, close }
}
