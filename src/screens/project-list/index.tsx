/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
// import { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils/hooks"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "../../utils/hooks/project"
import { useUsers } from "../../utils/hooks/user"
import { useProjectsSearchParams } from "./util"
import { Row } from "components/lib"

export type ParamType = {
  name: string
  personId: string
}

interface ProjectListScreenProps {
  ProjectButton: JSX.Element
}

export const ProjectListScreen: React.FC<ProjectListScreenProps> = ({
  ProjectButton,
}) => {
  // const [, setParam] = useState<ParamType>({
  //   name: "",
  //   personId: "",
  // })
  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"])
  // 基本类型和组件状态可以放到依赖里，非组件状态的对象绝不可以放到依赖里，这样会导致无限渲染
  const [param, setParam] = useProjectsSearchParams()

  useDocumentTitle("项目列表", false)
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200))

  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {ProjectButton}
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        ProjectButton={ProjectButton}
      />
    </Container>
  )
}
;(ProjectListScreen as any).whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
