import React from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from 'components/Button'
import List from './list'
import FilterBox from './filter'
import EditDialog from '../edit/EditDialog'
import { useState } from 'react'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import useOrder from 'hooks/useOrder'
import queryString from "query-string";
import DateRangePicker from 'components/Inputs/DateRangePicker'

function Order() {
  const router = useHistory()
  const [editData, setEditData] = React.useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState([])

  const headers = ['No', 'pizza name', 'toppings', 'size', 'Created At', '', '']

  const { state, fetchOrder, deleteOrder } = useOrder()

  React.useEffect(() => {
      fetchOrder(queryString.parse(router.location.search))
  }, [])

  return (
    <>
      <List
        headers={headers}
        data={state.orders}
        title="Orders"
        onDelete={(data) => {
          setEditData(data)
          setShowDelete(true)
        }}
        loading={state.loading}
        onEdit={(data) => {
          setEditData(data)
          console.log(data);
          setModalOpen(true)
        }}
        filter={
          <FilterBox
            onSearch={(query) => {
              window.location = `/order-query?${new URLSearchParams(query).toString()}`
            }}
          />
        }
        buttons={
          <>
            <Button
              onClick={() => {
                router.push('order-create')
              }}
            >
              Add New
            </Button>
            <Button
              onClick={() => {
                fetchOrder()
                window.location = `/order-query`;
              }}
            >
              Refresh
            </Button>
          </>
        }
      />
      <EditDialog
        modalOpen={modalOpen}
        data={editData}
        onToggle={() => {
          setModalOpen(false)
          fetchOrder()
        }}
      />
      <ConfirmDialog
        modalOpen={showDelete}
        title={`Delete Order`}
        body={`Are you sure to delete ${editData.name}`}
        onToggle={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false)
          deleteOrder(editData.id)
          fetchOrder()
        }}
      />
    </>
  )
}

export default Order
