import { login, logout, getAll, deleteData } from 'services/adminService'
import { DELETE_ADMIN } from 'store/types/admin'
import { SET_ADMINS, SET_ADMIN_INFO } from 'store/types/admin'

export const adminLoginAction = (data) => {
  return async (dispatch) => {
    let response = await login(data)
    if (response) {
      dispatch({
        type: SET_ADMIN_INFO,
        payload: response,
      })
      window.location = '/'
    }
  }
}

export const adminLogOutAction = () => {
  logout()
  window.location = '/'
}

export const adminGetAll = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    let response = await getAll()
    if(response){
      dispatch({
        type: SET_ADMINS,
        payload: response,
      })
    }
  
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}

export const adminDelete = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    let response = await deleteData(id)
    if (response) {
      dispatch({
        type: DELETE_ADMIN,
        payload: id,
      })
    }

    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}