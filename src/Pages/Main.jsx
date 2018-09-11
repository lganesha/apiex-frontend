import React from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import { api, history } from '~/Utils'
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react'
import UserProfile from '~/Pages/User/Profile'
import TemplateHeader from '~/Layouts/TemplateHeader'
import TemplateFooter from '~/Layouts/TemplateFooter'

class Main extends React.Component {

  state = {
    navigations: {}
  }

  componentDidMount() {
    api.get('/me').then(res => {
      console.log(res)
    });
    api.get('/menu/navigation/load', {params:{id: 1}}).then(res => {
      console.log(res)
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <TemplateHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
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
  pageTitle: state.common.pageTitle
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({
      type: process.env.PAGE_LOAD,
      payload
    })
})

export default withRouter(Main)
