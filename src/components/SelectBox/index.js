import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { isArray, valuesIn } from 'lodash'
import './index.scss'
function SelectBox({
  control,
  options,
  name,
  rules,
  value,
  customStyles,
  onValueChange,
  multiple = false,
  disabled = false,
  label = null,
  defaultValue = null,
}) {
  const styles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
    }),
  }
 const checkDefaultValue = (value, options) => {
   if (isArray(value) > 0) {
     return value.map((v) => options.find((c) => c.value === v))
   }
   return options.find((c) => c.value === value)
 }
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      // defaultValue={
      //   defaultValue ? defaultValue : options.find((c) => c.value === value)
      // }
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error },
      }) => (
        <>
          <Select
            styles={styles}
            isDisabled={disabled}
            inputRef={ref}
            isMulti={multiple}
            classNamePrefix="addl-class"
            defaultValue={defaultValue ? defaultValue : value}
            options={options}
            value={checkDefaultValue(value, options)}
            onChange={(val) => {
              onChange(val.value)
              const value = multiple ? val : val.value
              if (onValueChange) onValueChange(value)
            }}
            style={{ paddingBottom: 20 }}
          />
          {invalid && (
            <span className="text-danger text-capitalize">{`${
              label ? label : name
            } is required`}</span>
          )}
        </>
      )}
    />
  )
}
export default SelectBox
