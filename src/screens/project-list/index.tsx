import { SearchPanel, User } from "./search-panel"
import { List, ProjectType } from "./list"
import { useEffect, useState } from "react"
import { cleanObject } from "utils"
import qs from "qs"
import { useDebounce, useMount } from "utils/hooks"

const apiUrl = process.env.REACT_APP_API_URL

export type ParamType = {
  name: string
  personId: string
}

export const ProjectListScreen: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([])

  const [param, setParam] = useState<ParamType>({
    name: "",
    personId: "",
  })

  const debouncedParam = useDebounce(param, 400)

  const [list, setList] = useState<Array<ProjectType>>([])

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  )
}
