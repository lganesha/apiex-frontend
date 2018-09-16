import React from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import { AppFooter, AppHeader, AppSidebar, AppBreadcrumb } from '@coreui/react'
// app defined
import { api, auth } from '~/utils/api'
import { history, isPage, redirectIf, redirect } from '~/utils/uri'
import { isLogged, getToken, setToken } from '~/utils/session'
import { authTypes } from '~/common'
// include template
import TemplateHeader from '~/layouts/TemplateHeader'
import TemplateFooter from '~/layouts/TemplateFooter'
import TemplateAside from '~/layouts/TemplateAside'
// component to registering on route
import UserProfileDetail from '~/pages/User/ProfileDetail'
import UserProfileUpdate from '~/pages/User/ProfileUpdate'
import UserMemberDetail from '~/pages/User/MemberDetail'
import UserMemberUpdate from '~/pages/User/MemberUpdate'
import UserMemberList from '~/pages/User/MemberList'

class Main extends React.Component {

  state = {
    user: {},
    privileges: [],
    pages: [
      {
        component: (props) => <UserProfileDetail {...this.state} {...props} />,
        privilege: 'user.profile.detail',
        path: '/profile',
        exact: true
      },
      {
        component: (props) => <UserProfileUpdate {...this.state} {...props} />,
        privilege: 'user.profile.update',
        path: '/profile/update',
        exact: true
      },
      {
        component: (props) => <UserMemberList {...this.state} {...props} />,
        privilege: 'user.member.index',
        path: '/member',
        name: 'Member',
        exact: true
      },
      {
        component: (props) => <UserMemberList {...this.state} {...props} />,
        privilege: 'user.member.index',
        path: '/member/list',
        name: 'List',
        exact: true
      },
      {
        component: (props) => <UserMemberDetail {...this.state} {...props} />,
        privilege: 'user.member.detail',
        path: '/member/detail/:id',
        name: 'Detail',
        exact: true
      },
      {
        component: (props) => <UserMemberUpdate {...this.state} {...props} />,
        privilege: 'user.member.update',
        path: '/member/update/:id',
        name: 'Update',
        exact: true
      }
    ],
    navigations: {}
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
    } else {
      await setToken(this.props.token)
    }

    api.get('/me').then(res => {
      this.setState({
        user: res.data.data.user,
        privileges: res.data.data.privileges,
      })
    });

    api.get('/menu/navigation/load', {params:{id: 1}}).then(res => {
      this.setState({
        navigations: res.data.data
      })
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
          <div className="main">
            <AppBreadcrumb appRoutes={this.state.pages} />
            <Container fluid>
              <Switch>
                {
                  this.state.pages.map((page, index) => {
                    if (true === this.state.privileges.includes(page.privilege)) {
                      return (
                        <Route
                          exact
                          key={index}
                          path={page.path}
                          component={page.component}
                        />
                      )
                    }
                  })
                }
                <Route exact path="/" component={() => <UserProfileDetail {...this.state} />} />
              </Switch>
            </Container>
          </div>
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
