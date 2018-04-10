import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Route, Redirect,
} from 'react-router'


class PrivateRoute extends Component {


  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route { ...rest } render={props => (
        rest.loggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
      )} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.getIn(['login', 'loggedIn']),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);