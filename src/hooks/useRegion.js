import React from 'react'
import { getAll, store, update, deleteData } from 'services/regionService'

const initialState = { regions: [], loading: false }

function reducer(state, action) {
  switch (action.type) {
    case 'SET_REGION':
      return { ...state, regions: action.payload.data }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error()
  }
}

const useRegion = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const fetchRegions = async (query) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    let data = await getAll(query)
    dispatch({ type: 'SET_REGION', payload: { data: data } })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const storeRegions = async (values) => {
     await store(values)
  }
  const updateRegions = async (id, values) => {
      await update(id, values)
  }
  const deleteRegions = async (id) => {
    await deleteData(id)
  }

  return {
    fetchRegions,
    storeRegions,
    updateRegions,
    deleteRegions,
    state: state,
  }
}

export default useRegion
