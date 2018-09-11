import { createStore, combineReducers } from 'redux'
import { common } from '~/utils'

// combine all reducers
const reducer = combineReducers({
  common
})

// make store
const store = createStore(reducer)

// export store as default
export default store
