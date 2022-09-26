import React from 'react'
import { getAll, store, update, deleteData } from 'services/districtService'


const initialState = { districts: [], loading: false }

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DISTRICT':
      return { ...state, districts: action.payload.data }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error()
  }
}

const useDistrict = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const fetchDistricts = async (query) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    let data = await getAll(query)
    dispatch({ type: 'SET_DISTRICT', payload: { data: data } })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const storeDistricts = async (values) => {
    await store(values)
  }
  const updateDistricts = async (id, values) => {
    await update(id, values)
  }
  const deleteDistricts = async (id) => {
    await deleteData(id)
  }

  return {
    fetchDistricts,
    storeDistricts,
    updateDistricts,
    deleteDistricts,
    state: state,
  }
}

export default useDistrict
