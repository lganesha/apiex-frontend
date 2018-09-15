// get token from local storage if exists
const getToken = () => {
  return localStorage.getItem(process.env.TOKEN_KEY || 'token')
}

// set token to local storage
const setToken = async (token) => {
  await localStorage.setItem(process.env.TOKEN_KEY || 'token', token)
}

// check if token exists
const isLogged = () => {
  return getToken() !== null
}

const logout = () => {
  localStorage.clear()
  return !isLogged()
}

export {
  getToken,
  setToken,
  isLogged,
  logout
}