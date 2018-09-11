import { createBrowserHistory } from 'history'

// create history from browser
const history = createBrowserHistory()

// check current page 
const isPage = (path = '/', hastrailed = true) => {
  let pathname = window.location.pathname
  if (path === '/' || path === 'home') {
    return !pathname || pathname === 'home' || pathname === '/home'
  }
  if (pathname.substring(0, 1) === '/') {
    pathname = pathname.substring(1)
  }
  if (pathname.substring(pathname.length - 1) === '/') {
    pathname = pathname.substring(0, pathname.length - 1)
  }
  if (hastrailed === false) {
    return pathname === path
  } else {
    let pathnameParts = pathname.split('/')
    return pathnameParts[0] === path
  }
}

// check if is home
const isHome = () => {
  return isPage('home')
}

// check if is error 404
const is404 = () => {
  return isPage('error404')
}

// check if is error 500
const is500 = () => {
  return isPage('error500')
}

// redirect to path
const redirect = (target) => {
  history.push(target)
}

// redirect with condition
const redirectIf = (target, condition = true) => {
  if (condition === true) {
    redirect(target)
  }
}

export {
  history,
  isPage,
  isHome,
  is404,
  is500,
  redirect,
  redirectIf
}