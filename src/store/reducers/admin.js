import { DELETE_ADMIN } from 'store/types/admin'
import { SET_ADMIN_INFO, CLEAR_ADMIN_INFO, SET_ADMINS } from 'store/types/admin'
import { getCache } from 'utli/cache'

const initialState = {
  adminInfo: JSON.parse(getCache('admin')) || null,
  accessToken: getCache('access_token') || null,
  admins: [],
}

const admin = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_INFO:
      return {
        ...state,
        adminInfo: action.payload.admin,
        accessToken: action.payload.access_token,
      }
    case CLEAR_ADMIN_INFO:
      return {
        ...state,
        adminInfo: {},
        accessToken: null,
      }
    case SET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      }
    case DELETE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter(
          (admin) => admin.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default admin
