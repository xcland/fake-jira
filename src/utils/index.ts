// export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
// 会导致有效的 false 值被删除

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ""

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const resetRoute = () => (window.location.href = window.location.origin)
