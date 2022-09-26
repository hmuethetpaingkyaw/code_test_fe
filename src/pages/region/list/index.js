import React from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from 'components/Button'
import List from './list'
import EditDialog from '../edit/EditDialog'
import { useState } from 'react'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import queryString from "query-string";
import useRegion from 'hooks/useRegion'

function StateRegion() {
  const router = useHistory()
  const [editData, setEditData] = React.useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [showDelete, setShowDelete] = React.useState(false)

  const headers = ['No', 'name','Created At', '', '']

  const { state, fetchRegions, deleteRegions } = useRegion()

  React.useEffect(() => {
      fetchRegions(queryString.parse(router.location.search))
  }, [])

  return (
    <>
      <List
        headers={headers}
        data={state.regions}
        title="Regions"
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
                fetchRegions()
                window.location = `/state-region`;
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
          fetchRegions()
        }}
      />
      <ConfirmDialog
        modalOpen={showDelete}
        title={`Delete Regions`}
        body={`Are you sure to delete ${editData.name}`}
        onToggle={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false)
          deleteRegions(editData.id)
          fetchRegions()
        }}
      />
    </>
  )
}

export default StateRegion
