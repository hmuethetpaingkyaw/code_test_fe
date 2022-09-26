import { combineReducers } from 'redux'
import admin from './admin'
import user from './user'
import loading from './loading'
import util from './util'
import other_maintenance from './other_maintenance'

const reducers = combineReducers({
  admin,
  user,
  loading,
  util,
  other_maintenance,
})

export default reducers
