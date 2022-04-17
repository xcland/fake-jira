/* eslint-disable react-hooks/exhaustive-deps */
import { SearchPanel, User } from "./search-panel"
import { List, ProjectType } from "./list"
import { useEffect, useState } from "react"
import { useDebounce, useMount } from "utils/hooks"
import { useHttp } from "utils/http"

export type ParamType = {
  name: string
  personId: string
}

export const ProjectListScreen: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([])

  const client = useHttp()

  const [param, setParam] = useState<ParamType>({
    name: "",
    personId: "",
  })

  const debouncedParam = useDebounce(param, 400)

  const [list, setList] = useState<Array<ProjectType>>([])

  useEffect(() => {
    client("projects", { data: debouncedParam }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client("users").then(setUsers)
  })

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  )
}
