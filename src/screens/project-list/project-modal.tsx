import { Drawer, Button } from "antd"
import React from "react"

interface Props {
  projectModalOpen: boolean
  onClose: () => void
}

export const ProjectModal: React.FC<Props> = ({
  projectModalOpen,
  onClose,
}) => {
  return (
    <Drawer onClose={onClose} visible={projectModalOpen} width={"100%"}>
      <h1>ProjectModal</h1>
      <Button onClick={onClose}>CLOSE DRAWER</Button>
    </Drawer>
  )
}
