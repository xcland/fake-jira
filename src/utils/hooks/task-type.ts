import { useHttp } from "../http"
import { useQuery } from "react-query"
import { TaskType } from "../../types/task-type"

export const useTaskTypes = () => {
  const client = useHttp()
  return useQuery<TaskType[]>(["taskTypes"], async () => {
    return await client("taskTypes")
  })
}
