import React from 'react'
import { Collapse } from 'reactstrap'
function CollapseBox({ header, child,...props }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <div className="d-flex" {...props}>
        <div style={{ width: 180 }}>{header}</div>
        <i
          onClick={() => {
            setOpen(!open)
          }}
          className="ml-4 text-primary fa fa-arrow-down"
        ></i>
      </div>
      <Collapse isOpen={open}>{child}</Collapse>
    </>
  )
}

export default CollapseBox
