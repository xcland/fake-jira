import { useHttp } from "../http"
import { QueryKey, useMutation, useQuery } from "react-query"
import { Task } from "../../types/task"
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimisitc-options"

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

export function useDeleteTask(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation(({ id }: { id: number }) => {
    return client(`tasks/${id}`, {
      method: "DELETE",
    })
  }, useDeleteConfig(queryKey))
}

interface SortProps {
  fromId: number
  referenceId: number
  type: "before" | "after"
  fromKanbanId?: number
  toKanbanId?: number
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    })
  }, useReorderTaskConfig(queryKey))
}
