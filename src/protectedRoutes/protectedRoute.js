import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...restProps }) => {
  const adminInfo = useSelector((state) => state.admin.adminInfo)
  return (
    <Route
      {...restProps}
      render={(props) => {
        //   if (adminInfo) {
        return <Component {...props} />
        //   } else {
        //     return (
        //       <Redirect
        //         to={{
        //           pathname: '/auth/login',
        //         }}
        //       />
        //     )
        //   }
      }}
    />
  )
}

export default ProtectedRoute
