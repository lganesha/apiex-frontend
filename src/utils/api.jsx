import Axios from 'axios'
import { loadProgressBar } from 'axios-progress-bar'
import { getToken } from '~/utils/session'

// create new instance of Axios as api object
const api = Axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json'
  },
  transformRequest: function(data, headers) {
    headers['Authorization'] = 'Bearer ' + getToken()
  }
})

// create new instance of Axios as auth object
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
  api,
  auth
}