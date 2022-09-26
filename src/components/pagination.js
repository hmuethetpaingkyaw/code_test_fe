import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import queryString from 'query-string'
import useAdmin from 'hooks/useAdmin'
import { useState } from 'react'
function CustomPagnation({ data,page }) {
  const router = useHistory()

  const pageChange = (query) => {
    let page = parseInt(query);
     window.location = `/account-query?page=${page}`
  }
  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination>
          <PaginationItem>
            <PaginationLink
              aria-label="Previous"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault()
                pageChange(parseInt(page) - 1)
              }}
            >
              <i className="fa fa-angle-left" />
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>

          {Array.from(Array(data), (d,i) => {
            return (<PaginationItem key={i}>
              <PaginationLink
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault()
                  pageChange(i+1)
                }}
              >
                {i+1}
              </PaginationLink>
            </PaginationItem>)
          })}
          <PaginationItem>
            <PaginationLink
              aria-label="Next"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault()
                pageChange(parseInt(page) + 1)
              }}
            >
              <i className="fa fa-angle-right" />
              <span className="sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    </>
  )
}

export default CustomPagnation
