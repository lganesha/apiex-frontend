import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class TemplateFooter extends Component {
  render() {

    return (
      <React.Fragment>
        <span><a href="https://coreui.io">CoreUI</a> &copy; 2018 creativeLabs.</span>
        <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span>
      </React.Fragment>
    );
  }
}

TemplateFooter.propTypes = propTypes;
TemplateFooter.defaultProps = defaultProps;

export default TemplateFooter;