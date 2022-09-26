import React from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from 'components/Button'
import List from './list'
import EditDialog from '../edit/EditDialog'
import { useState } from 'react'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import useDistrict from 'hooks/useDistrict'
import queryString from 'query-string'

function District() {
  const router = useHistory()
  const [editData, setEditData] = React.useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [showDelete, setShowDelete] = React.useState(false)

  const headers = ['No', 'name', 'State/Region', 'Created At', '', '']

  const { state, fetchDistricts, deleteDistricts } = useDistrict()

  React.useEffect(() => {
    fetchDistricts(queryString.parse(router.location.search))
  }, [])

  return (
    <>
      <List
        headers={headers}
        data={state.districts}
        title="Districts"
        onDelete={(data) => {
          setEditData(data)
          setShowDelete(true)
        }}
        loading={state.loading}
        onEdit={(data) => {
          setEditData(data)
          setModalOpen(true)
        }}
        buttons={
          <>
            <Button
              onClick={() => {
                setModalOpen(true)
              }}
            >
              Add New
            </Button>
            <Button
              onClick={() => {
                fetchDistricts()
                window.location = `/district`
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
          fetchDistricts()
        }}
      />
      <ConfirmDialog
        modalOpen={showDelete}
        title={`Delete Districts`}
        body={`Are you sure to delete ${editData.name}`}
        onToggle={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false)
          deleteDistricts(editData.id)
          fetchDistricts()
        }}
      />
    </>
  )
}

export default District
