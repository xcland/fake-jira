import { useCallback, useState } from "react"
import { useMountedRef } from "."

interface State<D> {
  error: Error | null
  data: D | null
  stat: "idle" | "loading" | "error" | "success"
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const mountedRef = useMountedRef()

  const config = { ...defaultConfig, ...initialConfig }

  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  })

  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  )

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: "error",
        data: null,
      }),
    []
  )
  // 用于触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("please pass a Promise!")
      }
      setState((prevState) => ({ ...prevState, stat: "loading" }))
      // 直接使用 state 并放置到依赖数组会导致无限循环，应使用回调函数式的 setState
      setRetry(() => () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig)
      })
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data)
          return data
        })
        .catch((err) => {
          // catch 会消化异常，如果不主动抛出，外部无法接收异常
          setError(err)
          if (config.throwOnError) {
            return Promise.reject(err)
          }
          return err
        })
    },
    [config.throwOnError, mountedRef, setData, setError]
  )

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
    retry,
  }
}
