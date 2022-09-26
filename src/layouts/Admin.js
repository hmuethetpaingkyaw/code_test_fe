import React from 'react'
// react library for routing
import { useLocation, Switch } from 'react-router-dom'
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import ProtectedRoute from 'protectedRoutes/protectedRoute'
import { globalStyle } from 'styles/globalStyle'
import NotAuthorized from 'components/NotAuthorized'
import useTags from 'hooks/useTags'
import Tag from 'components/Tag'

import { routes } from 'routes.js'
import { useSelector, useDispatch } from 'react-redux'

import { getPermission } from 'store/actions'
import FullScreenLoading from 'components/FullScreenLoading'
import useAdmin from 'hooks/useAdmin'

function Admin() {
  const [sidenavOpen, setSidenavOpen] = React.useState(true)
  const location = useLocation()
  const { tags, removeTag } = useTags()
  const mainContentRef = React.useRef(null)

  const permissionLoading = useSelector(
    (state) => state.loading.permissionLoading
  )

  const { checkLogin } = useAdmin()

  React.useEffect(() => {
    checkLogin()
  }, [])

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

      if (prop.layout === '/') {
        return (
          <ProtectedRoute
            path={prop.layout + prop.path}
            exact
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name
      }
    }
    return 'Brand'
  }
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned')
      //   document.body.classList.add('g-sidenav-hidden')
    } else {
      document.body.classList.add('g-sidenav-pinned')
      //  document.body.classList.remove('g-sidenav-hidden')
    }
    setSidenavOpen(!sidenavOpen)
  }

  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
      />
      {globalStyle}
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(location.pathname)}
        />
        {/* {location.pathname !== '/' && (
          <Tag
            tags={tags}
            onRemove={(tag) => {
              removeTag(tag)
            }}
          />
        )} */}
        {!permissionLoading ? (
          <>
            <div className="px-4 py-4">
              <Switch>
                {getRoutes(routes)}
                {/* <Redirect from="*" to="/admin/dashboard" /> */}
              </Switch>
            </div>
            )
          </>
        ) : (
          <FullScreenLoading />
        )}
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  )
}

export default Admin
