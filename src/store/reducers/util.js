import { SET_TEMP_DATA } from 'store/type'

const initialState = {
  temp_data: {},
}
const util = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_DATA:
      return {
        ...state,
        temp_data: action.payload,
      }

    default:
      return state
  }
}
export default util
