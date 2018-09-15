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

it('renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/error:mode(404|500)" component={Err} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </Provider>
  )
})
