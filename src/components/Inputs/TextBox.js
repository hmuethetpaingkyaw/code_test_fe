import React from 'react'
import { InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap'
import './text-box.scss'
function TextBox({
  icon,
  prepend = false,
  errors,
  customErrorMessage = '',
  registerProps,
  onChange,
  ...props
}) {
  return (
    <>
      <InputGroup className="custom-tb input-group-merge input-group-alternative">
        {prepend && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{icon}</InputGroupText>
          </InputGroupAddon>
        )}

        {props.type === 'textarea' ? (
          <textarea
            className="form-control "
            {...props}
            {...registerProps}
            autoComplete={'off'}
            style={{ minHeight: 100 }}
          ></textarea>
        ) : (
          <input
            className="form-control"
            {...props}
            {...registerProps}
            autoComplete={'off'}
            onChange={onChange}
          />
        )}
      </InputGroup>
      {errors && (
        <div
          className="error-containe"
          style={{ marginTop: props.type === 'textarea' ? 80 : 5 }}
        >
          <span className="text-danger">{errors?.message}</span>
        </div>
      )}
      {errors && errors.type === 'validate' && (
        <div className="error-container">
          <span className="text-danger">{customErrorMessage}</span>
        </div>
      )}
    </>
  )
}
export default TextBox
