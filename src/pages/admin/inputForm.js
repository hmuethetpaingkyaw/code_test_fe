import React from 'react'
import EntryGrid from 'components/Inputs/EntryGrid'
import { Col, FormGroup, Row, Form } from 'reactstrap'
import Button from 'components/Button'
import TextBox from 'components/Inputs/TextBox'
import SelectBox from 'components/SelectBox'
import { useForm } from 'react-hook-form'
import useAdmin from 'hooks/useAdmin'
import { useEffect } from 'react'
function InputForm({ title, data, onToggle, modalOpen }) {
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
      setValue('email', data.email)
      setValue('role', data.role)
    } 
  }, [data])

  const { fetchAdmins, storeAdmins, updateAdmins } = useAdmin()

  const submitData = async (values) => {
    reset()
    console.log(values)
    let response = data
      ? await updateAdmins(data.id, values)
      : await storeAdmins(values)
    if (response) window.location.reload()
  }

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
                <label>Email</label>
                <TextBox
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  registerProps={register('email', {
                    required: 'Email is required',
                  })}
                  errors={errors.email}
                />
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <label>Role</label>
                <SelectBox
                  control={control}
                  className="form-control"
                  name="role"
                  rules={{ required: true }}
                  label="Role"
                  options={[
                    { label: 'Admin', value: 'Admin' },
                    { label: 'M&E Manager', value: 'M&E Manager' },
                    { label: 'Project Manager', value: 'project manager' },
                  ]}
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
