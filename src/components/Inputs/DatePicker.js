import React from 'react'
import ReactDatetime from 'react-datetime'
import { FormGroup, InputGroup } from 'reactstrap'
import dayjs from 'dayjs'
import './date-picker.scss'
function DatePicker({ placeholder, onChange, value, initialValue }) {
  return (
    <>
      <FormGroup className="datepicker-container">
        <InputGroup className="custom-tb input-group-merge input-group-alternative">
          <ReactDatetime
            inputProps={{
              placeholder: placeholder || 'Date Picker Here',
            }}
            timeFormat={false}
            value={value}
            dateFormat="DD/MM/yyyy"
            onChange={(v) => {
              onChange(dayjs(v).format('YYYY-MM-DD'))
            }}
            initialValue={initialValue}
          />
        </InputGroup>
        <i className="ni ni-calendar-grid-58 date-icon" />
      </FormGroup>
    </>
  )
}
export default DatePicker
