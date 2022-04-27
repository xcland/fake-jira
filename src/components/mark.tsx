import React from "react"

export function Mark({ name, keyword }: { name: string; keyword: string }) {
  if (!keyword) {
    return <>{name}</>
  }
  const arr = name.split(keyword)
  return (
    <>
      {arr.map((str, index) => {
        return (
          <span key={`${str}-${index}`}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#257AFD" }}>{keyword}</span>
            )}
          </span>
        )
      })}
    </>
  )
}
