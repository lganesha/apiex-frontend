import React from 'react'
import PropTypes from 'prop-types'

class TemplateFooter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>&copy; {this.props.projectYear} {this.props.projectCreator}.</span>
      </React.Fragment>
    )
  }
}

TemplateFooter.propTypes = {
  children: PropTypes.node,
  projectYear: PropTypes.string,
  projectCreator: PropTypes.string
}

TemplateFooter.defaultProps = {
  projectYear: '2018',
  projectCreator: 'zafexlabs'
}

export default TemplateFooter