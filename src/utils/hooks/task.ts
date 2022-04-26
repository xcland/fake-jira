import { useHttp } from "../http"
import { QueryKey, useMutation, useQuery } from "react-query"
import { Task } from "../../types/task"
import { useAddConfig, useEditConfig } from "./use-optimisitc-options"

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(["tasks", param], async () => {
    return await client("tasks", { data: param })
  })
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  )
}

export function useTask(taskId: number) {
  const client = useHttp()
  return useQuery<Task>(
    ["project", { taskId }],
    () => client(`tasks/${taskId}`),
    {
      enabled: Boolean(taskId),
    }
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Task>) => {
    return client(`tasks/${params.id}`, {
      method: "PATCH",
      data: params,
    })
  }, useEditConfig(queryKey))
}
