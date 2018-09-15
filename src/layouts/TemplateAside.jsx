import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer } from '@coreui/react'

class TemplateAside extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarHeader />
        <AppSidebarForm />
        <AppSidebarFooter />
        <AppSidebarMinimizer />
      </React.Fragment>
    )
  }
}

TemplateAside.propTypes = {
  children: PropTypes.node
}
TemplateAside.defaultProps = {
}

export default TemplateAside