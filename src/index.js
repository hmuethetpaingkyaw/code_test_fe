import React from 'react'
import ReactDOM from 'react-dom'
// plugins styles from node_modules

import 'react-notification-alert/dist/animate.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'select2/dist/css/select2.min.css'
import 'quill/dist/quill.core.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-notifications/lib/notifications.css'
import 'react-loading-skeleton/dist/skeleton.css'
// plugins styles downloaded
import 'assets/vendor/nucleo/css/nucleo.css'
// core styles
import 'assets/scss/argon-dashboard-pro-react.scss?v1.2.0'
import App from 'App'

// import Dashboard from "pages/Dashboard";

ReactDOM.render(<App />, document.getElementById('root'))
