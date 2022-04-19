/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState } from "react"
import { useDebounce } from "utils/hooks"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "../../utils/hooks/project"
import { useUsers } from "../../utils/hooks/user"

export type ParamType = {
  name: string
  personId: string
}

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState<ParamType>({
    name: "",
    personId: "",
  })

  const debouncedParam = useDebounce(param, 400)
  const { isLoading, error, data: list } = useProjects(debouncedParam)

  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
