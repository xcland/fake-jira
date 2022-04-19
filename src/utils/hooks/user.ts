import type { User } from "../../screens/project-list/search-panel"
import { useHttp } from "../http"
import { useAsync } from "./useAsync"
import { useEffect } from "react"
import { cleanObject } from "../index"

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...results } = useAsync<User[]>()

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) })).then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return results
}