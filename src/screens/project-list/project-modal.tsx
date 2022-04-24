import { Drawer, Button } from "antd"
import React from "react"
import { useProjectModal } from "./util"

interface Props {}

export const ProjectModal: React.FC<Props> = () => {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>ProjectModal</h1>
      <Button onClick={close}>CLOSE DRAWER</Button>
    </Drawer>
  )
}
