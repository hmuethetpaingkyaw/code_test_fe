import React from 'react'
import { useHistory } from 'react-router'
import Button from 'components/Button'
import List from './list'
import FilterBox from './filter'
import useAdmin from 'hooks/useAdmin'
import EditDialog from '../edit/EditDialog'
import { useState } from 'react'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import queryString from 'query-string'
import * as XLSX from 'xlsx'
import CustomPagnation from 'components/pagination'

function Admin() {
  const router = useHistory()
  const [editData, setEditData] = React.useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const headers = ['No', 'Name', 'Email', 'Role', 'Created At', '']

  const { state, fetchAdmins, deleteAdmins } = useAdmin()


  React.useEffect(() => {
    fetchAdmins(queryString.parse(router.location.search))
  }, [])
 
  const exportData = (data) => {
    const workBook = XLSX.utils.book_new()
    let workSheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Testing File')

    XLSX.writeFile(workBook, 'test.xlsx')
  }
  return (
    <>
      <List
        headers={headers}
        data={state.data.accounts}
        title="Accounts"
        onDelete={(data) => {
          setEditData(data)
          setShowDelete(true)
        }}
        loading={state.loading}
        onEdit={(data) => {
          setEditData(data)
          setShowEdit(true)
        }}
        filter={
          <FilterBox
            onSearch={(query) => {
              window.location = `/account-query?${new URLSearchParams(
                query
              ).toString()}`
            }}
          />
        }
        buttons={
          <>
            <Button
              onClick={() => {
                router.push('account-create')
              }}
            >
              Add New
            </Button>
            <Button
              onClick={() => {
                fetchAdmins()
              }}
            >
              Refresh
            </Button>
            <Button
              onClick={() => {
                exportData(state.data.accounts)
              }}
            >
              Export
            </Button>
          </>
        }
      />
      <div className="d-flex justify-content-end">
        <CustomPagnation
          data={state.data.totalPage}
          page={state.data.page}
          // onPageChange={(query) => {
          //   console.log(query);
          //   // window.location = `/account-query?${new URLSearchParams(
          //   //   query
          //   // ).toString()}`
          // }}
        />
      </div>
      <EditDialog
        modalOpen={showEdit}
        data={editData}
        onToggle={() => {
          setShowEdit(false)
          fetchAdmins()
        }}
      />
      <ConfirmDialog
        modalOpen={showDelete}
        title={`Delete account`}
        body={`Are you sure to delete ${editData?.name}?`}
        onToggle={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false)
          deleteAdmins(editData.id)
          fetchAdmins()
        }}
      />
    </>
  )
}

export default Admin
