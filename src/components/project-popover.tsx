import styled from "@emotion/styled"
import { Divider, List, Popover, Typography } from "antd"
import React from "react"
import { useProjects } from "utils/hooks/project"

export const ProjectPopover = ({
  ProjectButton,
}: {
  ProjectButton: JSX.Element
}) => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project, index) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {ProjectButton}
    </ContentContainer>
  )

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
