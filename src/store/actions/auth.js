import { login, logout, getPermssion } from 'services/authService'
import { SET_USER_INFO, SET_USER_ROLE } from 'store/types/auth'
export const loginAction = (data) => {
  return async (dispatch) => {
    let response = await login(data)
    if (response) {
      dispatch({
        type: SET_USER_INFO,
        payload: response,
      })
      window.location = '/'
    }
  }
}

export const getPermission = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_PERMISSION_LOADING',
      payload: true,
    })
    let response = await getPermssion()
    dispatch({
      type: SET_USER_ROLE,
      payload: response,
    })
    dispatch({
      type: 'SET_PERMISSION_LOADING',
      payload: false,
    })
  }
}

export const logOutAction = () => {
  logout()
  window.location = '/'
}
