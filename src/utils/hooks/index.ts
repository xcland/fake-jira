/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // const oldTitle = document.title
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [title, keepOnUnmount])
}

/**
 * 返回组件的返回状态，如果还没挂在或者已经卸载，返回 flase，否则返回 true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return mountedRef
}
