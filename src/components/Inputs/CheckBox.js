import clsx from 'clsx'
import React from 'react'
function CheckBox({ label, onChange,padding="mr-4",checked = false,rootKey=Math.random() }) {
  return (
    <div className={clsx("custom-control custom-checkbox",padding & padding)}>
      <input
        className="custom-control-input"
        id={`customCheck${rootKey}`}
        type="checkbox"
        onChange={onChange}
        checked={checked}ßß
        style={{border:"1px solid black"}}
      />
      <label className="custom-control-label" htmlFor={`customCheck${rootKey}`}>
        {label}
      </label>
    </div>
  )
}
export default CheckBox
