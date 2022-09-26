import React from 'react'
import './index.scss'
function NotAuthorized() {
  return (
    <div className="container">
      <div className='icon-container'>
        <i className="fas fa-lock"></i>
      </div>
      <h1>Permission required!</h1>
      <p>You're not authorized to this permission.</p>
    </div>
  )
}

export default NotAuthorized
