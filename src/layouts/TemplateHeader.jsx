import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Badge, Nav, NavItem, NavLink } from 'reactstrap'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'

class TemplateHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand>
          <span className="navbar-brand-full">{this.props.appName}</span>
          <span className="navbar-brand-minimized">{this.props.appNameMinimized}</span>
        </AppNavbarBrand>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell"></i>
              <Badge pill color="danger">5</Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none" style={{marginRight: '20px'}}>
            <NavLink href="#">
              <img
                src={'assets/img/avatars/6.jpg'}
                className="img-avatar"
                alt={this.props.displayName}
                title={this.props.tooltipName}
              />
            </NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    )
  }
}

TemplateHeader.propTypes = {
  children: PropTypes.node,
  displayName: PropTypes.string,
  tooltipName: PropTypes.string,
  appName: PropTypes.string,
  appNameMinimized: PropTypes.string
}
TemplateHeader.defaultProps = {
  displayName: 'User Name',
  tooltipName: 'User Name',
  appName: 'API Frontend',
  appNameMinimized: 'API'
}

export default TemplateHeader