import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'
import { Provider } from 'react-redux'
import AdminLayout from 'layouts/Admin.js'
import AuthLayout from 'layouts/Auth.js'
import store from './store'
import './app.scss';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/" render={(props) => <AdminLayout {...props} />} />
        </Switch>
        <NotificationContainer />
      </BrowserRouter>
    </Provider>
  )
}
export default App
