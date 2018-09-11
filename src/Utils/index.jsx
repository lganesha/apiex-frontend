import Axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { getToken, setToken, isLogged, logout } from '~/Utils/session'
import { history, isPage, isHome, is404, is500, redirect, redirectIf } from '~/Utils/uri'
import common from '~/Utils/common'
import sw from '~/Utils/sw'

// create new instance of Axios as api object
const api = Axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api' : '/api',
  headers: {
    'Accept': 'application/json',
    'Authorization': ('Bearer ' + getToken())
  }
})

// create new instance of Axios as api object
const auth = Axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api' : '/api',
  headers: {
    'Accept': 'application/json'
  }
})

// load progres bar for api
loadProgressBar({}, api)

// load progres bar for auth
loadProgressBar({}, auth)

export {
  common,
  history,
  api,
  auth,
  sw,
  getToken,
  setToken,
  isLogged,
  logout,
  isPage,
  isHome,
  is404,
  is500,
  redirect,
  redirectIf
}
