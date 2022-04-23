import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[]
    present: T
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: [],
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, future, present } = currentState
      if (past.length === 0) return currentState
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, future, present } = currentState
      if (future.length === 0) return currentState
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        future: newFuture,
        present: next,
        past: [...past, present],
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present } = currentState
      if (newPresent === present) return currentState
      return {
        past: [...past, present],
        future: [],
        present: newPresent,
      }
    })
  }, [])

  const reset = useCallback((newPresnet: T) => {
    setState({ present: newPresnet, past: [], future: [] })
  }, [])

  return [{ ...state }, { set, reset, canRedo, canUndo, redo, undo }] as const
}
