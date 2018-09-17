import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { history, isPage, redirectIf } from '~/utils/uri'
import { logout, isLogged } from '~/utils/session'
import store from '~/store'
import sw from '~/utils/sw'

import Err from '~/pages/Err'
import Main from '~/pages/Main'
import Login from '~/pages/Login'

redirectIf('/', isPage('logout') && logout())
redirectIf('/login', !isLogged() && !isPage('login'))

import 'flag-icon-css/css/flag-icon.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'axios-progress-bar/dist/nprogress.css'
import 'simple-line-icons/css/simple-line-icons.css'
import '@coreui/icons/css/coreui-icons.min.css'
import '@coreui/coreui/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/error:mode(404|500)" component={Err} />
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root-app')
)

sw()
