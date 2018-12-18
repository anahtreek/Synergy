/**
 * Helper wrapper that checks if the user is
 * already authenticated and fetches user details.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { findIndex, noop } from 'lodash';
import actions from './actions/auth';
import { UNPROTECTED_ROUTES } from './config';
import LoadingIndicator from './components/LoadingIndicator';
import PageFooter from './components/PageFooter';

const roleURLs = {
  Candidate: '/candidate',
  CL: '/login'
};

class Authenticator extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
    };
  }

  // componentDidMount() {
  //   const { userAccessData } = this.props;
  //   if(!userAccessData){
  //     this.props.getUserAccessData(localStorage.getItem("loggedUser"));
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const inUnprotectedRoute = findIndex(UNPROTECTED_ROUTES, r => (
      r === nextProps.currentRoute
    )) > -1;

    // User is not logged in -> redirect to login page
    // if (!nextProps.authenticated && !nextProps.authCheckStarted) {
    //   if (!inUnprotectedRoute) {
    //     this.redirect('/login');
    //   }
    // }

    // User is already authenticated -> redirect to landing page
    if (!this.props.logined && nextProps.logined && inUnprotectedRoute) {
      this.redirect(roleURLs[nextProps.user.role] || '/');
    }

    // if (this.props.profile.label !== nextProps.profile.label) {
      const targetUrl = roleURLs[nextProps.profile.label] || '/';
      if (this.props.location.pathname !== targetUrl) {
        this.redirect(targetUrl);
      }
    // }
  }

  redirect(redirect) {
    this.setState({ ...this.state, redirect });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { authCheckStarted, currentRoute, className, children, userAccessData } = this.props;

    if (authCheckStarted) {
      return <LoadingIndicator />;
    }

    return (
      <div className={`${currentRoute !== '/login' ? 'page-content' : null} ${className}`}>
        <div className="full-height-content">
          {children}
        </div>
        {
          currentRoute !== '/login' && userAccessData &&
          <PageFooter className="page-footer" />
        }
      </div>
    );
  }
}

Authenticator.defaultProps = {
  logined: false,
  authenticated: false,
  currentRoute: '',
  authCheckStarted: false,
  children: noop,
  checkAuth: noop,
  user: '',
  className: '',
  profile: {},
  getUserAccessData: noop,
  userAccessData: null
};

Authenticator.propTypes = {
  logined: PropTypes.bool,
  // authenticated: PropTypes.bool,
  currentRoute: PropTypes.string,
  authCheckStarted: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired),
    PropTypes.element.isRequired,
  ]),
  checkAuth: PropTypes.func.isRequired,
  user: PropTypes.string,
  className: PropTypes.string,
  profile: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  getUserAccessData: PropTypes.func.isRequired,
  userAccessData: PropTypes.object
};

const mapStateToProps = state => ({ ...state.auth });

const matchDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(Authenticator));
