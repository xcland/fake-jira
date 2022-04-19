/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO 依赖加上 callback 会导致无限循环，与 useCallback 和 useMemo 有关
  }, [])
}

export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
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
