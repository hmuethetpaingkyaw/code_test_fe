import React from 'react'
import SpinnerImage from 'assets/img/icons/spinner.png'
import './index.scss'
function FullScreenLoading() {
  return (
    <div className="container">
      <img src={SpinnerImage} width="20%" alt='' />
    </div>
  )
}
export default FullScreenLoading
