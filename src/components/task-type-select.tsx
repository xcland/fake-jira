import React from "react"
import { IdSelect } from "./id-select"
import { useTaskTypes } from "../utils/hooks/task-type"
export const TaskTypeSelect: React.FC<React.ComponentProps<typeof IdSelect>> = (
  props
) => {
  const { data: TaskTypes } = useTaskTypes()
  return <IdSelect {...props} options={TaskTypes || []}></IdSelect>
}
