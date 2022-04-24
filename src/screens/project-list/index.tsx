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
import { ButtonNoPadding, Row } from "components/lib"
import { projectListActions } from "./project-list.slice"
import { useDispatch } from "react-redux"

export type ParamType = {
  name: string
  personId: string
}

interface ProjectListScreenProps {}

export const ProjectListScreen: React.FC<ProjectListScreenProps> = () => {
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
  const dispatch = useDispatch()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
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
      />
    </Container>
  )
}
;(ProjectListScreen as any).whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
