import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { logout, isLogged, isPage, history, redirectIf, sw } from '~/utils'
import store from '~/store'
import Err from '~/pages/Err'
import Main from '~/pages/Main'
import Login from '~/pages/Login'

redirectIf('/', isPage('logout') && logout())
redirectIf('/login', !isLogged() && !isPage('login'))

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
