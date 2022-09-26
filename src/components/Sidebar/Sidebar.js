import React from 'react'
// react library for routing
import { useLocation, NavLink as NavLinkRRD } from 'react-router-dom'
// nodejs library that concatenates classes
import classnames from 'classnames'
// nodejs library to set properties for components
import { PropTypes } from 'prop-types'
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from 'react-perfect-scrollbar'
// reactstrap components
import { Collapse, Navbar, NavItem, NavLink, Nav } from 'reactstrap'
import './sidebar.scss'
// import { useSelector } from 'react-redux'
// import LogoImage from 'assets/img/brand/company_logo.png'

function Sidebar({ toggleSidenav, sidenavOpen, routes, rtlActive }) {
  const [state, setState] = React.useState({})
  const location = useLocation()
  React.useEffect(() => {
    setState(getCollapseStates(routes))
    // eslint-disable-next-line
  }, [])
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  // makes the sidenav normal on hover (actually when mouse enters on it)
  // const onMouseEnterSidenav = () => {
  //   if (!document.body.classList.contains('g-sidenav-pinned')) {
  //     document.body.classList.add('g-sidenav-show')
  //   }
  // }
  // // makes the sidenav mini on hover (actually when mouse leaves from it)
  // const onMouseLeaveSidenav = () => {
  //   if (!document.body.classList.contains('g-sidenav-pinned')) {
  //     document.body.classList.remove('g-sidenav-show')
  //   }
  // }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {}
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        }
      }
      return null
    })
    return initialState
  }
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i]?.collapse && getCollapseInitialState(routes[i].views)) {
        return true
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true
      }
    }
    return false
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      toggleSidenav()
    }
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.invisible) return null

      if (prop.redirect) {
        return null
      }
      if (prop.collapse) {
        var st = {}
        st[prop['state']] = !state[prop.state]

        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              onClick={(e) => {
                e.preventDefault()
                setState(st)
              }}
            >
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <span className="nav-link-text">{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        )
      }
      return (
        <NavItem className={activeRoute(prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={closeSidenav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text">{prop.name}</span>
              </>
            ) : prop.miniName !== undefined ? (
              <>
                <span className="sidenav-mini-icon"> {prop.miniName} </span>
                <span className="sidenav-normal"> {prop.name} </span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      )
    })
  }

  // const admin = useSelector((state) => state.admin.adminInfo)

  const scrollBarInner = (
    <>
      <div className="scrollbar-inner">
        <div className="sidenav-header d-flex ml-4 pt-2 justify-content-between">
          <div style={{ flex: 1, textAlign: 'center' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flat_mountain_sample.svg/1200px-Flat_mountain_sample.svg.png"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div
            className={classnames(
              'pr-3 sidenav-toggler sidebar-navbar-toggle',
              { active: sidenavOpen },
              { 'sidenav-toggler-dark': 'dark' }
            )}
            onClick={toggleSidenav}
          >
            <div className="sidenav-toggler-inner">
              <i
                className="sidenav-toggler-line"
                style={{ border: '1px solid black' }}
              />
              <i
                className="sidenav-toggler-line"
                style={{ border: '1px solid black' }}
              />
              <i
                className="sidenav-toggler-line"
                style={{ border: '1px solid black' }}
              />
            </div>
          </div>
        </div>
        <div className="navbar-inner mt-3">
          <Collapse navbar isOpen={true}>
            <Nav navbar>{createLinks(routes)}</Nav>
          </Collapse>
        </div>
      </div>
    </>
  )
  return (
    <Navbar
      className={
        'sidenav navbar-vertical navbar-expand-xs navbar-light bg-white ' +
        (rtlActive ? '' : 'fixed-left')
      }
      // onMouseEnter={onMouseEnterSidenav}
      // onMouseLeave={onMouseLeaveSidenav}
    >
      {navigator.platform.indexOf('Win') > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
    </Navbar>
  )
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => {},
  sidenavOpen: false,
  rtlActive: false,
}

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
  // rtl active, this will make the sidebar to stay on the right side
  rtlActive: PropTypes.bool,
}

export default Sidebar
