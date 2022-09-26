import * as CollectionService from 'services/collection'
import { SET_COLLECTION } from 'store/types/other_maintenance'
export const getAll = (query) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    let response = await CollectionService.getAll(query)
    dispatch({
      type: SET_COLLECTION,
      payload: response,
    })
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}

export const save = (values) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    await CollectionService.save(values)

    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}

export const update = (values) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    await CollectionService.update(values)

    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}

export const deleteData = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: true,
    })
    await CollectionService.deleteData(id)
    dispatch({
      type: 'SET_ACTION_LOADING',
      payload: false,
    })
  }
}
