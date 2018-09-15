import React from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import { AppBreadcrumb, AppFooter, AppHeader, AppSidebar, AppSidebarNav } from '@coreui/react'
import { api, auth } from '~/utils/api'
import { redirect } from '~/utils/uri'
import { isLogged, getToken, setToken } from '~/utils/session'
import UserProfile from '~/pages/User/Profile'
import TemplateHeader from '~/layouts/TemplateHeader'
import TemplateFooter from '~/layouts/TemplateFooter'
import TemplateAside from '~/layouts/TemplateAside'

class Main extends React.Component {

  state = {
    user: {

    },
    privileges: [

    ],
    navigations: {

    }
  }

  async componentDidMount() {
    if (isLogged()) {
      let validated = true
      await auth.post('/revalidate', {
        token: getToken()
      }).catch(err => {
        validated = false
      })
      if (false === validated) {
        return redirect('/login')
      }
    } else if (this.props.token) {
      await setToken(this.props.token)
    }

    api.get('/me').then(res => {
      this.setState({
        user: res.data.data.user,
        privileges: res.data.data.privileges,
      })
    });

    api.get('/menu/navigation/load', {params:{id: 1}}).then(res => {
      // console.log(res)
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <TemplateHeader displayName={this.state.user.name} tooltipName={this.state.user.email} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <TemplateAside />
          </AppSidebar>
          <main className="main">
          </main>
        </div>
        <AppFooter>
          <TemplateFooter />
        </AppFooter>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pageTitle: state.pageReducer.pageTitle,
  token: state.authReducer.token
})

export default withRouter(connect(mapStateToProps)(Main))
