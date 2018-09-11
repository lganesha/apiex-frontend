import Axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { getToken, setToken, isLogged, logout } from '~/utils/session'
import { history, isPage, isHome, is404, is500, redirect, redirectIf } from '~/utils/uri'
import common from '~/utils/common'
import sw from '~/utils/sw'

// create new instance of Axios as api object
const api = Axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json'
  },
  transformRequest: function (data, headers) {
    headers['Authorization'] = ('Bearer ' + getToken())
  }
})

// create new instance of Axios as api object
const auth = Axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000/api',
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
