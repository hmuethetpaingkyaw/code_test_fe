import React from 'react'
import EntryGrid from 'components/Inputs/EntryGrid'
import { Col, FormGroup, Row, Form } from 'reactstrap'
import Button from 'components/Button'
import TextBox from 'components/Inputs/TextBox'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import SelectBox from 'components/SelectBox'
import useTopping from 'hooks/useTopping'
import useOrder from 'hooks/useOrder'
import useSize from 'hooks/useSize'
import { useState } from 'react'
import CheckBox from 'components/Inputs/CheckBox'

function InputForm({ title, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({})
  const { state: topping, fetchToppings } = useTopping()
  const { state: size, fetchSizes } = useSize()
  const [selectedData, setSelectedData] = useState(null)
  React.useEffect(() => {
    if (data) {
      setValue('name', data.name)
      setSelectedData(data?.size.id)
      setValue('size_id', data.size.id)
    }
    fetchToppings()
    fetchSizes()
  }, [data])

  const { storeOrder, updateOrder } = useOrder()
  const submitData = async (values) => {
    reset()
    console.log(values)
    data ? await updateOrder(data.id, values) : await storeOrder(values)
  }

  const toppingOptions = topping?.toppings.map((e) => {
    return {
      label: e.name,
      value: e.id,
    }
  })
  // const sizeOptions = size?.sizes.map((e) => {
  //   return {
  //     label: e.name,
  //     value: e.id,
  //   }
  // })
  
  return (
    <EntryGrid title={data ? 'Order Edit' : 'Order Add'}>
      <Form onSubmit={handleSubmit(submitData)}>
        <div className="pt-2 pb-2">
          <Row>
            <Col md="4">
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
            <Col md="4">
              <FormGroup>
                <label>Sizes</label>
                <div className="d-flex">
                  {size?.sizes.map((s,index) => {
                    return (
                      <CheckBox
                        key={index}
                        onChange={() => {
                          setValue('size_id', s.id)
                          setSelectedData(s.id)
                        }}
                        label={s.name}
                        checked = {s.id === selectedData}
                      />
                    )
                  })}
                </div>
                {/* <SelectBox
                  control={control}
                  name="size_id"
                  options={sizeOptions}
                  // multiple={false}
                  // defaultValue={data ? data.toppings.id : ''}
                  rules={{ required: true }}
                  // onValueChange={(list) => {
                  //   setValue(
                  //     'sizes',
                  //     list.map((l) => {
                  //       return l.value
                  //     })
                  //   )
                  // }}
                /> */}
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <label>Toppings</label>
                <SelectBox
                  control={control}
                  name="toppings"
                  options={toppingOptions}
                  multiple={true}
                  // defaultValue={data ? data.toppings.id : ''}
                  rules={{ required: true }}
                  onValueChange={(list) => {
                    setValue(
                      'toppings',
                      list.map((l) => {
                        return l.value
                      })
                    )
                  }}
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
