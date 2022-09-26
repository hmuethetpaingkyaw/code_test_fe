import React from 'react'
import * as AdminService from 'services/adminService'
import { getAll, store, update, deleteData } from 'services/adminService'
import { getCache } from 'utli/cache'


const initialState = { data: [], pages: [], loading: false }

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ADMIN':
      return { ...state, data: action.payload.data}
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error()
  }
}

const useAdmin = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const fetchAdmins = async (query) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    let data = await getAll(query)
    dispatch({ type: 'SET_ADMIN', payload: { data: data } })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const login = async (values) => {
    if (await AdminService.login(values)) window.location = '/'
  }

  const checkLogin = () => {
    const admin = getCache('admin') || null
    if (admin)
      dispatch({ type: 'SET_ADMIN', payload: { data: JSON.parse(admin) } })
    else window.location = '/auth/login'
  }
  const storeAdmins = async (values) => {
    await store(values)
  }
  const updateAdmins = async (id, values) => {
    await update(id, values)
  }
  const deleteAdmins = async (id) => {
    await deleteData(id)
  }

  return {
    fetchAdmins,
    storeAdmins,
    updateAdmins,
    deleteAdmins,
    login,
    checkLogin,
    state: state,
  }
}

export default useAdmin
