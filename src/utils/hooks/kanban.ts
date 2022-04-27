import { useHttp } from "../http"
import { QueryKey, useMutation, useQuery } from "react-query"
import { Kanban } from "../../types/kanban"
import { useAddConfig, useDeleteConfig } from "./use-optimisitc-options"

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery<Kanban[]>(["kanbans", param], async () => {
    return await client("kanbans", { data: param })
  })
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Kanban>) => {
    return client(`kanbans`, {
      data: params,
      method: "POST",
    })
  }, useAddConfig(queryKey))
}

export function useDeleteKanban(queryKey: QueryKey) {
  const client = useHttp()
  return useMutation(({ id }: { id: number }) => {
    return client(`kanbans/${id}`, {
      method: "DELETE",
    })
  }, useDeleteConfig(queryKey))
}
