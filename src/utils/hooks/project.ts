import { useCallback, useEffect } from "react"
import { useAsync } from "./useAsync"
import { ProjectType } from "../../screens/project-list/list"
import { useHttp } from "../http"
import { cleanObject } from "../index"

export const useProjects = (param?: Partial<ProjectType>) => {
  const client = useHttp()
  const { run, ...results } = useAsync<ProjectType[]>()
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [param, client]
  )

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects }).then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return results
}

export const useEditProject = () => {
  const { run, ...asyncResults } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<ProjectType>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    )
  }
  return {
    mutate,
    ...asyncResults,
  }
}

export const useAddProject = () => {
  const { run, ...asyncResults } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<ProjectType>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    )
  }
  return {
    mutate,
    ...asyncResults,
  }
}
