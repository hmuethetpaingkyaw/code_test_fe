import React from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import './entry-grid.scss';
function EntryGrid({title,noCard=false,children}) {
  if (!noCard)
  return (
    <Card className='entry-grid'>
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  )

  return (
    <div className='no-card-container'>
      <h5>{title}</h5>
      {children}
    </div>
  )
}

export default EntryGrid
