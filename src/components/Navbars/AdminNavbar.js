// nodejs library that concatenates classes
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
// reactstrap components
import {
  Collapse,
  UncontrolledDropdown,
  Navbar,
  Nav,
  Container,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  NavItem,
  NavLink,
} from 'reactstrap'
import { adminLogOutAction } from 'store/actions'
function AdminNavbar({ theme, sidenavOpen, toggleSidenav, adminLogOutAction }) {
  const admin = useSelector((state) => state.admin.adminInfo)
  // function that on mobile devices makes the search open

  // function that on mobile devices makes the search close
  // const closeSearch = () => {
  //   document.body.classList.remove('g-navbar-search-shown')
  //   setTimeout(function () {
  //     document.body.classList.remove('g-navbar-search-show')
  //     document.body.classList.add('g-navbar-search-hiding')
  //   }, 150)
  //   setTimeout(function () {
  //     document.body.classList.remove('g-navbar-search-hiding')
  //     document.body.classList.add('g-navbar-search-hidden')
  //   }, 300)
  //   setTimeout(function () {
  //     document.body.classList.remove('g-navbar-search-hidden')
  //   }, 500)
  // }

  // const showSearch = () => {
  //   const searchPages = ['/user', '/category', '/product', '/notification']
  //   if (searchPages.includes(router.pathname)) {
  //     return true
  //   }
  //   return false
  // }

  return (
    <>
      <Navbar className="navbar-top navbar-dark bg-primary navbar-expand border-bottom">
        <Container fluid>
          <div
            className={classnames(
              'pr-3 sidenav-toggler admin-navbar-toggle',
              { active: sidenavOpen },
              { 'sidenav-toggler-dark': theme === 'dark' }
            )}
            onClick={toggleSidenav}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
          <Collapse
            navbar
            isOpen={true}
            className="d-flex justify-content-between "
          >
            <h3 className="text-white mt-2 brand-text">Code Test</h3>
            <Nav className=" ml-auto ml-md-0 mr-2" navbar>
              <UncontrolledDropdown>
                <DropdownToggle
                  style={{ background: 'none', border: 'none', zIndex: 0 }}
                >
                  <div className="navbar-dropdown">
                    <img
                      src="https://i.pinimg.com/736x/4c/a7/d0/4ca7d06cdc9f617b3d605844908015f9.jpg"
                      alt=""
                    />
                    <h6>{admin?.name}</h6>
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem divider />
                  <DropdownItem
                    href="#pablo"
                    onClick={() => adminLogOutAction()}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: 'dark',
}

export default connect(null, { adminLogOutAction })(AdminNavbar)
