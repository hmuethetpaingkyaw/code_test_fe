import React from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from 'components/Button'
import List from './list'
import EditDialog from '../edit/EditDialog'
import { useState } from 'react'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import useTownship from 'hooks/useTownship'
import queryString from "query-string";

function Township() {
  const router = useHistory()
  const [editData, setEditData] = React.useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [showDelete, setShowDelete] = React.useState(false)

  const headers = ['No', 'name','Township','Created At', '', '']

  const { state, fetchTownships, deleteTownships } = useTownship()

  React.useEffect(() => {
      fetchTownships(queryString.parse(router.location.search))
  }, [])

  return (
    <>
      <List
        headers={headers}
        data={state.townships}
        title="Townships"
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
                fetchTownships()
                window.location = `/township`;
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
          fetchTownships()
        }}
      />
      <ConfirmDialog
        modalOpen={showDelete}
        title={`Delete Township`}
        body={`Are you sure to delete ${editData.name}`}
        onToggle={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false)
          deleteTownships(editData.id)
          fetchTownships()
        }}
      />
    </>
  )
}

export default Township
