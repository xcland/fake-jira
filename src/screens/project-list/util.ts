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
