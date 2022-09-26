import React from 'react'
import EntryGrid from 'components/Inputs/EntryGrid'
import { Col, FormGroup, Row, Form } from 'reactstrap'
import Button from 'components/Button'
import TextBox from 'components/Inputs/TextBox'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import useDistrict from 'hooks/useDistrict'
import SelectBox from 'components/SelectBox'
import { useState } from 'react'
import useRegion from 'hooks/useRegion'
function InputForm({ title, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm()
  React.useEffect(() => {
    if (data) {
      setValue('name', data.name)
      setValue('state_region_id', data.state_region_id)
    } 
    fetchRegions()
  }, [data])

  const { storeDistricts, updateDistricts } = useDistrict()
  const { state, fetchRegions} = useRegion()

  const submitData = async (values) => {
    reset()
    data ? await updateDistricts(data.id, values) : await storeDistricts(values)
  }
    const stateRegionOptions = state?.regions.map((e) => {
      return {
        label: e.name,
        value: e.id,
      }
    })
  return (
    <EntryGrid title={title}>
      <Form onSubmit={handleSubmit(submitData)}>
        <div className="pt-2 pb-2">
          <Row>
            <Col md="6">
              <FormGroup>
                <label>Name</label>
                <TextBox
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  registerProps={register('name', {
                    required: 'Name is required',
                  })}
                  errors={errors.name}
                />
              </FormGroup>
            </Col>
              <Col md="6">
                <FormGroup>
                  <label>State/Region</label>
                  <SelectBox
                    control={control}
                    name="state_region_id"
                    options={stateRegionOptions}
                    defaultValue={data ? data.state_region_id : ''}
                    rules={{ required: true }}
                  />
                </FormGroup>
              </Col>
          </Row>
          <div className="mt-5 text-center">
            <Button>Save</Button>
            <Button
              className="ml-2"
              onClick={() => {
                reset()
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </EntryGrid>
  )
}

export default InputForm
