import React from "react"

type FallbackRender = (props: { error: Error | null }) => React.ReactElement
interface IState {
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  IState
> {
  state = {
    error: null,
  }

  // 当子组件抛出异常，此处可以接收到，并且自动调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender(error)
    }
    return children
  }
}
