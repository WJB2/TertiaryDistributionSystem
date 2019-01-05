import React from 'react';

class Authenticated extends React.PureComponent {
  render() {
    const { children, notAuthenticated = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;

    return localStorage.getItem('AUTHENTICATED') ? childrenRender : notAuthenticated;
  }
}

export default Authenticated;
