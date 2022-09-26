import React from 'react'
import './index.scss'

import { Button } from 'reactstrap'
import { useHistory } from 'react-router'
import clsx from 'clsx'
function Tag({ tags, onRemove }) {
  const containerRef = React.useRef()
  const router = useHistory()
  return (
    <div className="parent">
      <Button
        size="sm"
        onClick={() => {
          containerRef.current.scrollLeft -= 100
        }}
      >{`<`}</Button>
      <div className="tag-container" ref={containerRef}>
        {tags.map((tag, index) => (
          <div
            key={`tag-index-${index}`}
            className={clsx(
              router.location?.pathname === `/` + tag?.path && 'active'
            )}
          >
            <span
              onClick={() => {
                router.push(tag?.path)
              }}
            >
              {tag?.name}
            </span>
            <span
              onClick={() => {
                onRemove(tag)
              }}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <Button
        size="sm"
        onClick={() => {
          containerRef.current.scrollLeft += 100
        }}
      >{`>`}</Button>
    </div>
  )
}

export default Tag
