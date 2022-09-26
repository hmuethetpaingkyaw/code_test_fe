import React from 'react'
import Button from 'components/Button'
import Table from 'components/Table'
import CheckBox from 'components/Inputs/CheckBox'
import dayjs from 'dayjs'

function List({
  headers,
  data,
  onEdit,
  title,
  buttons,
  onDelete,
  selectedData = [],
  onSelect,
  filter,
  loading,
}) {
  return (
    <Table
      title={title}
      headers={headers.map((e) => (
        <th scope="col" key={`thead-${Math.random()}`}>
          {e}
        </th>
      ))}
      loading={loading}
      filter={filter}
      buttons={buttons}
      rows={data?.map((e, index) => (
        <tr key={`table-row-${Math.random()}`}>
          <td>{index + 1}</td>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td>{e.role}</td>
          <td>{dayjs(e.created_at).format('DD/MM/YYYY')}</td>
          <td>
            <Button size="sm" color="warning" onClick={() => onEdit(e)}>
              Edit
            </Button>
          </td>
          <td>
            <Button size="sm" color="danger" onClick={() => onDelete(e)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    />
  )
}

export default List
