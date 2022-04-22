import { useState } from "react"
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

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    })
  // 用于触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("please pass a Promise!")
    }
    setState({ ...state, stat: "loading" })
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
  }

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
