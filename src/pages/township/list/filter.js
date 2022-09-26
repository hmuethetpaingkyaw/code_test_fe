import TextBox from 'components/Inputs/TextBox'
import React, { useState } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'

function FilterBox({ headers, onSearch }) {
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
    }),
  }
  //const [searchType, setSearchType] = useState('')
  const [search, setSearch] = useState()

  return (
    <>
      <Row>
        <Col md={5} xs={5}>
          <TextBox
            styles={{ height: 34 }}
            onChange={(e) => setSearch(e.target.value)}
            value={typeof search === 'object' ? '' : search}
          />
        </Col>

        <Button
          size="sm"
          color="success"
          style={{ height: 35 }}
          onClick={() => {
            if (search) {
              onSearch({ search })
              setSearch('')
            }
          }}
        >
          <i className="fa fa-search" />
        </Button>
      </Row>
    </>
  )
}

export default FilterBox
