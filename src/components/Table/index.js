import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Select from 'react-select'
import clsx from 'clsx'
import './table.scss'
import {
  CardBody,
  Card,
  Table as ReactStrapTable,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'
export default function Table({
  headers,
  rows,
  title,
  buttons,
  filter,
  data,
  loading = false,
  onPageChange,
  grid = false,
}) {
  const [activePage, setActivePage] = React.useState(1)
  const [rowPerPage, setRowPerPage] = React.useState(10)
  const router = useHistory()

  React.useEffect(() => {
    if (data?.page)
      if (!onPageChange) {
        router.push(
          `${router.location.pathname}?page=${activePage}&limit=${rowPerPage}`
        )
      } else {
        onPageChange(activePage, rowPerPage)
      }
  }, [activePage, rowPerPage, data?.page, onPageChange, router])

  return (
    <>
      <div className={clsx('pb-1', grid && 'grid-background pt-1 pl-2')}>
        <h3>{title}</h3>
        <div className="mt-2 mb-2 button-container">{buttons}</div>
      </div>
      <Card>
        <CardBody>
          <div className="pb-4">{filter}</div>

          <div className="table-container" style={{ maxHeight: '65vh' }}>
            <ReactStrapTable className="app-table">
              <thead>
                <tr
                  style={{
                    border: '1px solid #e9e9ef',
                    position: 'sticky',
                    top: -5,
                    zIndex: 1,
                  }}
                >
                  {headers}
                </tr>
              </thead>

              {!loading && <tbody>{rows}</tbody>}
            </ReactStrapTable>
          </div>
          {loading && (
            <div style={{ width: '100%' }}>
              <SkeletonTheme height={40}>
                <Skeleton count={5} className="d-flex" />
              </SkeletonTheme>
            </div>
          )}
        </CardBody>
        <CardFooter>
          {data?.length && !loading && (
            <div className="d-flex justify-content-end">
              <p>Total : {data.length ? data.length : 0}</p>
            </div>
          )}
          {data?.totalPages > 0 && (
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center mr-5">
                <span className="mr-3">Row Per Page : </span>
                <Select
                  defaultValue={{ value: '10', label: '10' }}
                  onChange={(val) => {
                    setActivePage(1)
                    setRowPerPage(val.value)
                  }}
                  options={[
                    { value: '5', label: '5' },
                    { value: '10', label: '10' },
                    { value: '25', label: '25' },
                    { value: '50', label: '50' },
                    { value: '100', label: '100' },
                  ]}
                />
                <span className="ml-2">
                  {data?.pagingCounter}-{rowPerPage * data?.page} of{' '}
                  {data?.totalDocs}
                </span>
              </div>

              {data?.totalPages > 1 && (
                <Pagination>
                  {data?.hasPrevPage && (
                    <PaginationItem>
                      <PaginationLink
                        previous
                        onClick={() => setActivePage(data?.page - 1)}
                      />
                    </PaginationItem>
                  )}
                  {[...Array(data?.totalPages)].map((x, i) => (
                    <PaginationItem active={i + 1 === data?.page}>
                      <PaginationLink
                        onClick={() => setActivePage(i + 1)}
                        key={`paginiation-item-${x}-${i}`}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {data?.hasNextPage && (
                    <PaginationItem>
                      <PaginationLink
                        next
                        onClick={() => setActivePage(data?.page + 1)}
                      />
                    </PaginationItem>
                  )}
                </Pagination>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
