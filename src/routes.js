import Home from 'pages/home'
import Login from 'pages/Login'
import NewAdmin from 'pages/admin/new'
import Admin from 'pages/admin/list'
import District from 'pages/district/list'
import Township from 'pages/township/list'
import StateRegion from 'pages/region/list'
const routes = [
  {
    path: '/login',
    name: 'login',
    icon: 'fas fa-home text-primary',
    component: Login,
    layout: '/auth',
    invisible: true,
  },
  {
    path: '',
    name: 'Home',
    icon: 'fas fa-home text-cyan',
    component: Home,
    layout: '/',
  },

  {
    collapse: true,
    name: 'Admin',
    icon: '	fa fa-file-word text-green',
    state: 'adminCollapse',
    views: [
      {
        path: 'account-create',
        name: 'account - create',
        miniName: 'OQ',
        component: NewAdmin,
        layout: '/',
      },
      {
        path: 'account-query',
        name: 'account - list',
        miniName: 'OQ',
        component: Admin,
        layout: '/',
      },
    ],
  },
  {
    collapse: true,
    name: 'Basic Data',
    icon: '	fa fa-file-word text-danger',
    state: 'basicdataCollapse',
    views: [
      {
        path: 'state-region',
        name: 'State/Region',
        miniName: 'OQ',
        component: StateRegion,
        layout: '/',
      },
      {
        path: 'district',
        name: 'District',
        miniName: 'OQ',
        component: District,
        layout: '/',
      },
      {
        path: 'township',
        name: 'Township',
        miniName: 'OQ',
        component: Township,
        layout: '/',
      },
    ],
  },
]

const getAllRoutes = () => {
  const allRoutes = []
  routes.map((e) => {
    if (e.collapse) {
      e.views.map((v) => allRoutes.push(v))
    } else allRoutes.push(e)
  })
  return allRoutes
}
const allRoutes = getAllRoutes()

export { routes, allRoutes }
