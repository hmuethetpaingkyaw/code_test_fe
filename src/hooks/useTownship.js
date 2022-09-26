import React from 'react'
import { getAll, store, update, deleteData } from 'services/townshipService'

const initialState = { townships: [], loading: false }

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TOWNSHIP':
      return { ...state, townships: action.payload.data }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error()
  }
}

const useTownship = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const fetchTownships = async (query) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    let data = await getAll(query)
    dispatch({ type: 'SET_TOWNSHIP', payload: { data: data } })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const storeTownships = async (values) => {
    await store(values)
  }
  const updateTownships = async (id, values) => {
    await update(id, values)
  }
  const deleteTownships = async (id) => {
    await deleteData(id)
  }

  return {
    fetchTownships,
    storeTownships,
    updateTownships,
    deleteTownships,
    state: state,
  }
}

export default useTownship
