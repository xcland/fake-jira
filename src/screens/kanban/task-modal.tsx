import { Button, Form, Input, Modal } from "antd"
import { useForm } from "antd/lib/form/Form"
import { TaskTypeSelect } from "components/task-type-select"
import { UserSelect } from "components/user-select"
import React, { useEffect } from "react"
import { useDeleteTask, useEditTask } from "utils/hooks/task"
import { useTaskModal, useTasksQueryKey } from "./util"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export function TaskModal() {
  const [form] = useForm()
  const { editingTaskId, editingTask, close } = useTaskModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  )

  function onCancel() {
    close()
    form.resetFields()
  }

  async function onOk() {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    close()
  }

  useEffect(
    function () {
      form.setFieldsValue(editingTask)
    },
    [form, editingTask]
  )

  const { mutateAsync } = useDeleteTask(useTasksQueryKey())

  function startDelete() {
    close()
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除该看板吗？",
      onOk() {
        return mutateAsync({ id: Number(editingTaskId) })
      },
    })
  }

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ fontSize: "14px" }}
          size={"small"}
          onClick={startDelete}
        >
          删除
        </Button>
      </div>
    </Modal>
  )
}
