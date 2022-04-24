import { Drawer, Button } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice"

interface Props {}

export const ProjectModal: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModalOpen}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        CLOSE DRAWER
      </Button>
    </Drawer>
  )
}
