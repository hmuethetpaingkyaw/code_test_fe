import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../store/reducers'

const DEFAULT_STATE = {}

const store = createStore(
  reducers,
  DEFAULT_STATE,
  compose(
    applyMiddleware(thunk)
    //    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
