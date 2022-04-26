/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
// import { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils/hooks"
import styled from "@emotion/styled"
import { useProjects } from "../../utils/hooks/project"
import { useUsers } from "../../utils/hooks/user"
import { useProjectModal, useProjectsSearchParams } from "./util"
import { ButtonNoPadding, ErrorBox, Row } from "components/lib"

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
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))

  const { open } = useProjectModal()
  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorBox error={error} /> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}
;(ProjectListScreen as any).whyDidYouRender = false

const Container = styled.div`
  flex: 1;
  padding: 3.2rem;
`
