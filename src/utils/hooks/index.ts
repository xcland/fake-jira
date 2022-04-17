/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export const useMount = (callback: any) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value: any, delay: number = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在 value 变化之后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 每次在上一个 useEffect 处理完之后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}
