import { useHttp } from "../http"
import { useAsync } from "./useAsync"
import { useEffect } from "react"
import { cleanObject } from "../index"
import { User } from "../../types/user"

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...results } = useAsync<User[]>()

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) })).then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return results
}
