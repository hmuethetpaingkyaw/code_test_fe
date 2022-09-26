import { SET_USER_INFO, CLEAR_USER_INFO, SET_USER_ROLE } from 'store/types/auth'
import { getCache } from 'utli/cache'

const initialState = {
  userInfo: JSON.parse(getCache('user')) || null,
  accessToken: getCache('access_token') || null,
  role: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.user,
        accessToken: action.payload.access_token,
      }
    case CLEAR_USER_INFO:
      return {
        ...state,
        userInfo: {},
        accessToken: null,
      }
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      }

    default:
      return state
  }
}

export default user
