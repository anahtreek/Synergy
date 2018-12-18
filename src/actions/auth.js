/**
 * User authentication actions
 */
import Service from '../services/auth';

export default {
  checkAuth: () => (
    (dispatch) => {
      dispatch({ type: 'AUTH_CHECK_STARTED' });
      Service.checkAuth((err, user) => {
        if (err) {
          dispatch({ type: 'AUTH_FAILED' });
        } else {
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        }
      });
    }
  ),
  login: credentials => (
    (dispatch) => {
      dispatch({ type: 'LOGIN_STARTED' });
      Service.login(credentials, (user) => {
        if (user.output.status == "Y") {
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGIN_FAILED', payload: user });
        }
      });
    }
  ),
  logout: () => (
    (dispatch) => {
      dispatch({ type: 'LOGOUT' });
      window.localStorage.clear();
      Service.logout();
    }
  ),
  dismissError: () => dispatch => dispatch({ type: 'DISMISS_ERROR' }),
  switchProfile: profile => dispatch => dispatch({ type: 'SWITCH_PROFILE', payload: profile }), 
  getUserAccessData: (loggedUser) => (
    (dispatch) => {
      dispatch({ type: 'USER_ROLES_FETCH_STARTED', payload: loggedUser });
      Service.getUserAccessData(loggedUser, (data) => {
        if(data) dispatch({ type: 'USER_ROLES_FETCH_DONE', payload: data });
      });
    }
  ),
  clearThisDataInAuth: (key) => (
    (dispatch) => {
      dispatch({ type: 'CLEAR_THIS_DATA_IN_AUTH', payload: key});
    }
  ),
  submitLoginActions: credentials => (
    (dispatch) => {
      dispatch({ type: 'LOGIN_ACTIONS_STARTED', payload: credentials.action });
      Service.submitLoginActions(credentials, (user) => {
        dispatch({ type: 'LOGIN_ACTIONS_FINISHED', payload: user });
      });
    }
  ),
  updateAction: (action) => (
    (dispatch) => {
      dispatch({ type: 'CURRENT_ACTION', payload: action});
    }
  )
};
