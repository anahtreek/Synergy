import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import actions from '../../actions/auth';
import LoginComponent from '../../components/Login';
import LoadingIndicator from '../../components/LoadingIndicator';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';

const cookies = new Cookies();

class LoginPage extends Component{

  constructor(){
    super();    
    this.state = {
      candidate: false,
      output: null
    };
  }

  componentWillMount() {
    if(this.props.user)
      this.props.history.push('/candidate');  
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.output){
      this.setState({ ...this.state, output: nextProps.output });
      if(nextProps.output.status == 'Y' && (nextProps.action == 'login' || !nextProps.action)){
        nextProps.history.push('/candidate');        
      }      
      nextProps.clearThisDataInAuth('output');
    }else{
      this.setState({ ...this.state, output: null });
    }
  }

  render() {

    const { login, dismissError, loader, candidate, action, updateAction,
      submitLoginActions } = this.props;

    return(
      <LoginComponent
        login={login}
        error={loader}
        output={this.state.output}
        dismissError={dismissError}
        action={action}
        updateAction={updateAction}
        submitLoginActions={submitLoginActions}
      />
    );

  }

}

LoginPage.defaultProps = {
  login: noop,
  dismissError: noop,
  loginFailed: false,
  getUserAccessData: noop,
  clearThisDataInAuth: noop,
  user: null,
  output: null,
  loader: false,
  candidate: false,
  action: '',
  updateAction: noop,
  submitLoginActions: noop
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
  loginFailed: PropTypes.bool.isRequired,
  getUserAccessData: PropTypes.func.isRequired,
  clearThisDataInAuth: PropTypes.func,
  user: PropTypes.string,
  output: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loader: PropTypes.bool,
  candidate: PropTypes.bool,
  action: PropTypes.string,
  updateAction: PropTypes.func,
  submitLoginActions: PropTypes.func
};

const mapStateToProps = state => ({ ...state.auth });

const matchDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(LoginPage));
