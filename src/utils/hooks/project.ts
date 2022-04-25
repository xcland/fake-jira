// import { useCallback, useEffect } from "react"
import { ProjectType } from "../../screens/project-list/list"
import { useHttp } from "../http"
// import { cleanObject } from "../index"
import { QueryKey, useMutation, useQuery } from "react-query"
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimisitc-options"

export const useProjects = (param?: Partial<ProjectType>) => {
  const client = useHttp()
  return useQuery<ProjectType[]>(["projects", param], async () => {
    let result = await client("projects", { data: param })
    return result
  })
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<ProjectType>) => {
    return client(`projects/${params.id}`, {
      method: "PATCH",
      data: params,
    })
  }, useEditConfig(queryKey))
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<ProjectType>) => {
    return client(`projects`, {
      data: params,
      method: "POST",
    })
  }, useAddConfig(queryKey))
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(({ id }: { id: number }) => {
    return client(`projects/${id}`, {
      method: "DELETE",
    })
  }, useDeleteConfig(queryKey))
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<ProjectType>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  )
}
