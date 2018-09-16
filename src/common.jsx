import { auth } from '~/utils/api'
import { redirect } from '~/utils/uri'
import { setToken, getToken, logout } from '~/utils/session'

/******************************************
    GLOBAL PAGE
 ******************************************/

// define page types
const pageTypes = {
  pageLoad: 'page_load'
}

// declare page reducer
const pageReducer = (state = {pageTitle: 'Home'}, action) => {
  switch (action.type) {
    case pageTypes.pageLoad:
      return Object.assign({}, state, action.payload || {})
    default:
      return Object.assign({}, state)
  }
}

/******************************************
    ALERT
 ******************************************/

// define page types
const alertTypes = {
  error: 'error',
  success: 'success',
  clear: 'clear',
}

const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case alertTypes.error:
      return {
        type: 'alert-danger',
        message: action.message
      }
    case alertTypes.success:
      return {
        type: 'alert-success',
        message: action.message
      }
    case alertTypes.clear:
      return {}
    default:
      return state
  }
}

/******************************************
     AUTHENTICATION
 ******************************************/

// define auth types
const authTypes = {
  loginRequest: 'login_request',
  loginSuccess: 'login_success',
  loginFailure: 'login_failure',
  logout: 'logout'
}

// declare auth reducer
const authReducer = (state = {status: 400, token: getToken()}, action) => {
  switch (action.type) {
    case authTypes.loginRequest:
      return Object.assign({}, state, action.payload || {})
    case authTypes.loginSuccess:
      return Object.assign({}, state, action.payload || {})
    case authTypes.loginFailure:
      return Object.assign({}, state, action.payload || {})
    default:
      return Object.assign({}, state)
  }
}

// declare action
const authLoginAction = (username, password) => {
  return dispatch => {
    auth.post('/login', {
      name: username,
      password: password
    }).then((res) => {
      setToken(res.data.data)
      dispatch(() => {
        let payload = {
          status: res.status,
          token: res.data.data
        }
        return {
          type: authTypes.loginSuccess,
          payload
        }
      })
      redirect('/')
    }).catch(err => {
      dispatch(() => {
        let payload = {
          status: err.response.status,
          token: null
        }
        return {
          type: authTypes.loginFailure,
          payload
        }
      })
    })
  }
}

const authLogoutAction = () => {
  logout()
  let payload = {
    status: 200,
    token: null
  }
  return {
    type: authTypes.logout,
    payload
  }
}

/******************************************
     export everything
 ******************************************/

export {
  pageTypes,
  pageReducer,
  alertTypes,
  alertReducer,
  authTypes,
  authReducer,
  authLoginAction,
  authLogoutAction
}