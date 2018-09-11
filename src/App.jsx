import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { logout, isLogged, isPage, history, redirectIf } from '~/Utils'
import store from '~/store'
import Err from '~/Pages/Err'
import Main from '~/Pages/Main'
import Login from '~/Pages/Login'

redirectIf('/', isPage('logout') && logout())
redirectIf('/login', !isLogged() && !isPage('login'))

import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'axios-progress-bar/dist/nprogress.css'
import 'simple-line-icons/css/simple-line-icons.css';
import '@coreui/icons/css/coreui-icons.min.css';
import '@coreui/coreui/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';

class App extends React.Component {
  render() {
    return (
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
  }
}

// const mapStateToProps = state => ({
//   pageTitle: state.common.pageTitle
// })

// const mapDispatchToProps = dispatch => ({
//   onLoad: (payload) =>
//     dispatch({
//       type: process.env.PAGE_LOAD,
//       payload
//     })
// })

export default App
