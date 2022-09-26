import * as RoleService from 'services/roleService'
import { SET_ROLE, SET_USERS } from 'store/types/role'
export const getRole = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    let response = await RoleService.getRole()
    dispatch({
      type: SET_ROLE,
      payload: response,
    })
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}

export const getUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    let response = await RoleService.getUsers()
    dispatch({
      type: SET_USERS,
      payload: response.docs,
    })
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}

export const createUser = (values) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    let response = await RoleService.createUser(values)
    dispatch({
      type: SET_USERS,
      payload: response.docs,
    })
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    await RoleService.deleteUser(id)
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}

export const updateUserRole = (values) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    await RoleService.updateUserRole(values)
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}
