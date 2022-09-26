import { SET_TEMP_DATA } from 'store/type'
export const setTempData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_TEMP_DATA,
      payload: data,
    })
  }
}
