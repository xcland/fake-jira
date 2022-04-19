import { useEffect } from "react"
import { useAsync } from "./useAsync"
import { ProjectType } from "../../screens/project-list/list"
import { useHttp } from "../http"
import { cleanObject } from "../index"

export const useProjects = (param?: Partial<ProjectType>) => {
  const client = useHttp()
  const { run, ...results } = useAsync<ProjectType[]>()

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) })).then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return results
}
