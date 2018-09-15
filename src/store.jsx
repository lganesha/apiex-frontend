import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { alertReducer, pageReducer, authReducer } from '~/common'

// registering reducer
const reducer = combineReducers({
  alertReducer,
  pageReducer,
  authReducer
})

// make store
export default createStore(
  reducer,
  applyMiddleware(thunk)
)
