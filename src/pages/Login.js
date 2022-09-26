import React from 'react'
import { useForm } from 'react-hook-form'
//this need to be import for css prop
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
// nodejs library that concatenates classes
import classnames from 'classnames'
import { connect } from 'react-redux'
import { adminLoginAction } from 'store/actions'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Form,
  Container,
  Spinner,
} from 'reactstrap'
import TextBox from 'components/Inputs/TextBox'
import CheckBox from 'components/Inputs/CheckBox'
import useAdmin from 'hooks/useAdmin'

function Login({ adminLoginAction }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { login } = useAdmin()
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassowrd] = React.useState(false)

  const submitData = async (values) => {
    await login(values)
    // setLoading(true)
    // await adminLoginAction(values)
    // setLoading(false)
    // window.location = '/'
  }

  return (
    <>
      <Container className="mt-5 pb-5 bg">
        <div className="justify-content-center">
          <Card className="bg-white border-0 mb-0">
            <CardHeader
              css={styles.headerText}
              className="bg-primary text-center mb-4"
            >
              Code Test Dashboard
            </CardHeader>
            <CardBody className="py-lg-5" style={{ width: 500 }}>
              <Form onSubmit={handleSubmit(submitData)}>
                <FormGroup className={classnames('mb-3')}>
                  <TextBox
                    className="form-control"
                    placeholder="Email"
                    type="text"
                    registerProps={register('email', {
                      required: 'Email is required',
                    })}
                    prepend
                    icon={<i className="ni ni-email-83" />}
                    errors={errors.email}
                  />
                </FormGroup>
                <FormGroup>
                  <TextBox
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    registerProps={register('password', {
                      required: 'Password is required',
                    })}
                    prepend
                    icon={<i className="ni ni-lock-circle-open" />}
                    errors={errors.password}
                  />
                </FormGroup>
                <FormGroup className="mt-2 ml-4">
                  <CheckBox
                    label="Show Password"
                    onChange={() => {
                      setShowPassowrd(!showPassword)
                    }}
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && (
                      <Spinner
                        size="sm"
                        role="status"
                        className="mr-2"
                      ></Spinner>
                    )}
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  )
}

const styles = {
  headerText: css`
    color: #fff;
  `,
}

export default connect(null, { adminLoginAction })(Login)
