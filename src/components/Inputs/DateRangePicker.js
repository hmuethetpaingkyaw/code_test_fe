import React from 'react'
import DatePicker from './DatePicker'

function DateRangePicker({ onDateChange }) {
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState()

  const onStartDateChange = (date) => {
    setStartDate(date)
    onDateChange([date, endDate])
  }

  const onEndDateChange = (date) => {
    setEndDate(date)
    onDateChange([startDate, date])
  }

  return (
    <div className="d-flex" style={{height:35}}>
      <DatePicker
        placeholder={'Start Date'}
        onChange={(date) => onStartDateChange(date)}
        value={startDate}
      />
      <DatePicker
        placeholder={'End Date'}
        onChange={(date) => onEndDateChange(date)}
        value={endDate}
      />
    </div>
  )
}

export default DateRangePicker
