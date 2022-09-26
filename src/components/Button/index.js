import React from 'react'
import { Button as ReactStrapButton } from 'reactstrap'
function Button({ children, ...props }) {
  let style = {
    minWidth: 100,
    height: 35,
    padding: '5px 10px',
  }

  if (props.size === 'sm') {
    style = {
      minWidth: 50,
      height: 30,
      padding: '5px 10px',
    }
  }

  return (
    <ReactStrapButton style={style} {...props}>
      {children}
    </ReactStrapButton>
  )
}
export default Button
