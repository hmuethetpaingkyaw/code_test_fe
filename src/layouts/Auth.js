import React from 'react'
// react library for routing
import { useLocation, Route, Switch } from 'react-router-dom'

import { routes } from 'routes.js'

function Auth() {
  const location = useLocation()
  const mainContentRef = React.useRef(null)
  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContentRef.current.scrollTop = 0
  }, [location])
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  return (
    <>
      <div ref={mainContentRef}>
        <Switch>
          {getRoutes(routes)}
          {/* <Redirect from="*" to="/auth/login" /> */}
        </Switch>
      </div>
    </>
  )
}

export default Auth
