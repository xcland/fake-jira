// import { useCallback, useEffect } from "react"
import { ProjectType } from "../../screens/project-list/list"
import { useHttp } from "../http"
// import { cleanObject } from "../index"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useProjects = (param?: Partial<ProjectType>) => {
  const client = useHttp()
  return useQuery<ProjectType[]>(["projects", param], async () => {
    let result = await client("projects", { data: param })
    return result
  })
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<ProjectType>) => {
      return client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  )
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<ProjectType>) => {
      return client(`projects`, {
        data: params,
        method: "POST",
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  )
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
