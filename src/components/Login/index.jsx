import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Logo from '../Logo';
import MaterialInput from '../MaterialInput';
import styles from './styles.css';
import LoadingIndicator from '../LoadingIndicator';
import DatetimeInput from '../DatetimeInput';

const INVALID_USERNAME = 'Resume number is incorrect, please try again!';
const INVALID_PASSWORD = 'Password is incorrect, please try again!';
const INVALID_NEW_PASSWORD = 'New password is incorrect, please try again!';
const INVALID_NEW_PASSWORD_LEN = 'New password should contain minimum 8 characters'
const INVALID_CONFIRM_PASSWORD = 'Confirm password is incorrect, please try again!';
const INVALID_DOB = 'Date of birth is incorrect, please try again!';
const INVALID_EMAIL = 'Email id is incorrect, please try again!';
const INVALID_NEW_EMAIL = 'New email id is incorrect, please try again!';

const initialCredentials = {
  username: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
  dob:'',
  emailId: '',
  newEmailId: ''
};

const initialErrors = {
  username: false,
  password: false,
  newPassword: false,
  newPasswordLen: false,
  confirmPassword: false,
  dob: false,
  emailId: false,
  newEmailId: false
};

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      credentials: {
        action: props.action? props.action: 'login',
        ...initialCredentials
      },
      errors: {
        ...initialErrors
      },
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.reset = this.reset.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(model, value) {
    const { credentials } = this.state;
    credentials[model] = value;
    this.setState({
      ...this.state,
      credentials: credentials
    });
    // if (this.props.error) this.props.dismissError();
  }

  login() {
    // submitEvent.preventDefault();
    if(!this.state.credentials.username)
      this.setState({ ...this.state, errors: { ...initialErrors, username: true } });
    else if(!this.state.credentials.password)
      this.setState({ ...this.state, errors: { ...initialErrors, password: true } });
    else this.props.submitLoginActions(this.state.credentials);
  }

  changePassword(){
    if(!this.state.credentials.username)
      this.setState({ ...this.state, errors: { ...initialErrors, username: true } });
    else if(!this.state.credentials.password)
      this.setState({ ...this.state, errors: { ...initialErrors, password: true } });
    else if(!this.state.credentials.newPassword)
      this.setState({ ...this.state, errors: { ...initialErrors, newPassword: true } });
    else if(this.state.credentials.newPassword.length < 8)
      this.setState({ ...this.state, errors: { ...initialErrors, newPasswordLen: true } });
    else if(!this.state.credentials.confirmPassword)
      this.setState({ ...this.state, errors: { ...initialErrors, confirmPassword: true } });
    else if(this.state.credentials.newPassword !== this.state.credentials.confirmPassword)
      this.setState({ ...this.state, message: 'New password and confirm password does not match.' });
    else {
      this.setState({ ...this.state, errors: { ...initialErrors } },
      () => this.props.submitLoginActions(this.state.credentials));
    }
  }

  resetPassword(){
    if(!this.state.credentials.username)
      this.setState({ ...this.state, errors: { ...this.state.errors, username: true } });
    else {
      this.setState({ ...this.state, errors: { ...initialErrors } },
      () => this.props.submitLoginActions(this.state.credentials));
    }
  }

  forgotReferenceNumber(){
    if(!this.state.credentials.username 
      || !(/^\S+@\S+\.\S+$/.test(this.state.credentials.username)))
      this.setState({ ...this.state, errors: { ...this.state.errors, username: true } });
    else {
      this.setState({ ...this.state, errors: { ...initialErrors } },
      () => this.props.submitLoginActions(this.state.credentials));
    }
  }

  updateEmailId(){
    if(!this.state.credentials.username)
      this.setState({ ...this.state, errors: { ...initialErrors, username: true } });
    else if(!this.state.credentials.emailId 
      || !(/^\S+@\S+\.\S+$/.test(this.state.credentials.emailId)))
      this.setState({ ...this.state, errors: { ...initialErrors, emailId: true } });
    else if(!this.state.credentials.newEmailId
      || !(/^\S+@\S+\.\S+$/.test(this.state.credentials.newEmailId)))
      this.setState({ ...this.state, errors: { ...initialErrors, newEmailId: true } });
    else if(!this.state.credentials.dob)
      this.setState({ ...this.state, errors: { ...initialErrors, dob: true } });
    else {
      this.setState({ ...this.state, errors: { ...initialErrors } },
      () => this.props.submitLoginActions(this.state.credentials));
    }
  }
  
  changeAction(action){
    this.setState({
      ...this.state,
      credentials:{
        ...initialCredentials,
        action
      },
      errors: {
        ...initialErrors
      },
      message: ''
    }, () => {
      this.props.updateAction(action);
    });
  }

  reset(){
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        ...initialCredentials
      },
      errors: {
        ...initialErrors
      },
      // message: ''
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.output && nextProps.action){        
      this.setState({ 
          ...this.state, 
          message: nextProps.output.message, 
          credentials:{
            ...this.state.credentials,
            action: nextProps.action
          }
        }, () => {
          if(nextProps.output.status == "Y")
            this.reset();
        });
    }else {
      if(nextProps.output){
        this.setState({ 
            ...this.state, 
            message: nextProps.output.message, 
            credentials:{
              ...this.state.credentials
            }
          }, () => {
            if(nextProps.output.status == "Y")
              this.reset();
          });
      }
      if(nextProps.action) 
        this.setState({ 
          ...this.state,
          credentials:{
            ...this.state.credentials,
            action: nextProps.action
          }
        });
    }
  }

  handleDateChange(model, value){
    const { credentials } = this.state;
    credentials[model] = value;
    this.setState({
      ...this.state,
      credentials: credentials
    });
  }

  render() {
    return (
      <div className={styles.loginPage}>
        <div className={styles.leftPanel}>
          <Logo />
          <p className={`${styles.description} ${styles.ppad}`}>
            If you have already applied for a position with us, you can now update your resume with the most recent information. 
            Opportunities at Wipro Technologies arise on an ongoing basis and by updating your resume, you can help us consider you for our new requirements.
          </p>
          <div className={styles.filler} />
          <div className={styles.copyright}>
            <span> © Wipro Ltd. 2018. </span>
            <p className={styles.pfootpad}>
              Wipro does not charge any fee at any stage of the recruitment process.
              Wipro has not authorized any agency/partner to collect any fee for recruitment.
              Wipro practices employment processes without regard to a person's gender, age, race, color, disability, national origin, veteran status, or any other characteristic protected by applicable law.
          </p>
        </div>
        </div>
        {this.props.error? 
          <div className={styles.rightPanel}>
            <LoadingIndicator />
          </div>:
        <div className={styles.rightPanel}>
          {this.state.credentials.action === 'login' && 
          <div className={styles.loginForm}>
            <div className={styles.formHead}>
              <h1>Login</h1>
              <span className={styles.separator} />
            </div>
            <form>
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Resume Number"
                value={this.state.credentials.username}
                hasError={this.state.errors.username}
                errorMessage={INVALID_USERNAME}
                onChange={e => this.handleChange('username', e.target.value.trim())}
              />
              <MaterialInput
                type="password"
                className="block light"
                value={this.state.credentials.password}
                placeholder="Password"
                hasError={this.state.errors.password}
                errorMessage={INVALID_PASSWORD}
                onChange={e => this.handleChange('password', e.target.value)}
              />
              <a className={['text-center', 'block', styles.forgotPassword].join(' ')}
                onClick={this.changeAction.bind(this, 'FRN')}>
                Forgot Resume Number ?
              </a>
              {this.state.message && <a className={['text-center', 'block', styles.forgotPassword, styles.msgclr].join(' ')}>
                  {this.state.message? this.state.message: ' '}
              </a>}
              <button className="btn primary block" type="button" onClick={this.login}>Login</button>
            </form>
            <div>
              <div className={[styles.socialLoginText, 'text-center'].join(' ')}>
                {/* Or Sign in with your account on: */} &nbsp;
              </div>
              <div className={styles.socialIcons}>
                <span title="Change Password" onClick={this.changeAction.bind(this, 'CP')}><span className={styles.fbIcon} /></span>
                <span title="Reset Password" onClick={this.changeAction.bind(this, 'RP')}><span className={styles.twitterIcon} /></span>
                <span title="Forgot Password" onClick={this.changeAction.bind(this, 'FP')}><span className={styles.linkedinIcon} /></span>
                <span title="Update Email Id" onClick={this.changeAction.bind(this, 'UE')}><span className={styles.googleIcon} /></span>
              </div>
              <p className={styles.copyright}>
                  © Wipro Ltd. 2018.
              </p>
            </div>
          </div>}

        {this.props.error? <LoadingIndicator />:
          this.state.credentials.action === 'CP' && 
          <div className={styles.loginForm}>
            <div className={styles.formHead}>
              <h1>Change Password</h1>
              <span className={`${styles.separator} ${styles.separatorcp}`} />
            </div>
            <form>
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Resume Number"
                value={this.state.credentials.username}
                hasError={this.state.errors.username}
                errorMessage={INVALID_USERNAME}
                onChange={e => this.handleChange('username', e.target.value.trim())}
              />
              <MaterialInput
                type="password"
                className="block light"
                value={this.state.credentials.password}
                placeholder="Old Password"
                hasError={this.state.errors.password}
                errorMessage={INVALID_PASSWORD}
                onChange={e => this.handleChange('password', e.target.value)}
              />
              <MaterialInput
                type="password"
                className="block light"
                value={this.state.credentials.newPassword}
                placeholder="New Password"
                hasError={this.state.errors.newPassword || this.state.errors.newPasswordLen}
                errorMessage={this.state.errors.newPasswordLen? INVALID_NEW_PASSWORD_LEN: INVALID_NEW_PASSWORD}
                onChange={e => this.handleChange('newPassword', e.target.value)}
              />
              <MaterialInput
                type="password"
                className="block light"
                value={this.state.credentials.confirmPassword}
                placeholder="Confirm Password"
                hasError={this.state.errors.confirmPassword}
                errorMessage={INVALID_CONFIRM_PASSWORD}
                onChange={e => this.handleChange('confirmPassword', e.target.value)}
              />              
              <a className={['text-center', 'block', styles.forgotPassword, styles.msgclr].join(' ')}>
                  {this.state.message}
              </a>
              <button className="btn primary block" type="button" onClick={this.changePassword.bind(this)}>Change Password</button>
              <a className={['text-center', 'block', styles.forgotPassword].join(' ')}></a>
              <button className="btn alert block" type="button" onClick={this.changeAction.bind(this, 'login')}>Cancel</button>
            </form>
          </div>}

          {this.props.error? <LoadingIndicator />:
          this.state.credentials.action === 'RP' && 
          <div className={styles.loginForm}>
            <div className={styles.formHead}>
              <h1>Reset Password</h1>
              <span className={`${styles.separator} ${styles.separatorrp}`} />
          </div>
            <form>
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Resume Number"
                value={this.state.credentials.username}
                hasError={this.state.errors.username}
                errorMessage={INVALID_USERNAME}
                onChange={e => this.handleChange('username', e.target.value.trim())}
              />            
              <a className={['text-center', 'block', styles.forgotPassword, styles.msgclr].join(' ')}>
                  {this.state.message}
              </a>
              <button className="btn primary block" type="button" onClick={this.resetPassword.bind(this)}>Reset Password</button>
              <a className={['text-center', 'block', styles.forgotPassword].join(' ')}></a>
              <button className="btn alert block" type="button" onClick={this.changeAction.bind(this, 'login')}>Cancel</button>
            </form>
          </div>}

          {this.props.error? <LoadingIndicator />:
          this.state.credentials.action === 'FP' && 
          <div className={styles.loginForm}>
            <div className={styles.formHead}>
              <h1>Forgot Password</h1>
              <span className={`${styles.separator} ${styles.separatorfp}`} />
            </div>
            <form>
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Resume Number"
                value={this.state.credentials.username}
                hasError={this.state.errors.username}
                errorMessage={INVALID_USERNAME}
                onChange={e => this.handleChange('username', e.target.value.trim())}
              />            
              <a className={['text-center', 'block', styles.forgotPassword, styles.msgclr].join(' ')}>
                  {this.state.message}
              </a>
              <button className="btn primary block" type="button" onClick={this.resetPassword.bind(this)}>Submit</button>
              <a className={['text-center', 'block', styles.forgotPassword].join(' ')}></a>
              <button className="btn alert block" type="button" onClick={this.changeAction.bind(this, 'login')}>Cancel</button>
            </form>
          </div>}

          {this.props.error? <LoadingIndicator />:
          this.state.credentials.action === 'UE' && 
          <div className={styles.loginForm}>
            <div className={styles.formHead}>
              <h1>Update Email Id</h1>
              <span className={`${styles.separator} ${styles.separatorue}`} />
            </div>
            <form>
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Resume Number"
                value={this.state.credentials.username}
                hasError={this.state.errors.username}
                errorMessage={INVALID_USERNAME}
                onChange={e => this.handleChange('username', e.target.value.trim())}
              /> 
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Email Id"
                value={this.state.credentials.emailId}
                hasError={this.state.errors.emailId}
                errorMessage={INVALID_EMAIL}
                onChange={e => this.handleChange('emailId', e.target.value.trim())}
              />   
              <MaterialInput
                type="text"
                className="block light"
                placeholder="New Email Id"
                value={this.state.credentials.newEmailId}
                hasError={this.state.errors.newEmailId}
                errorMessage={INVALID_NEW_EMAIL}
                onChange={e => this.handleChange('newEmailId', e.target.value.trim())}
              />  
              <div className="col-md-6 col-xs-12">
                <DatetimeInput
                  type="date"
                  models="dob"
                  className={`block light ${styles.dtWidth}`}
                  onChange={this.handleDateChange}
                  value={this.state.credentials.dob}
                  formats="DD-MM-YYYY"
                  hasError={this.state.errors.dob}
                  errorMessage={INVALID_DOB}
                  placeholder="Date of Birth"
                />
              </div>    
              <a className={['text-center', 'block', styles.forgotPassword, styles.msgclr].join(' ')}>
                  {this.state.message}
              </a>
              <button className="btn primary block" type="button" onClick={this.updateEmailId.bind(this)}>Submit</button>
              <a className={['text-center', 'block', styles.forgotPassword].join(' ')}></a>
              <button className="btn alert block" type="button" onClick={this.changeAction.bind(this, 'login')}>Cancel</button>
            </form>
          </div>}

          {this.props.error? <LoadingIndicator />:
          this.state.credentials.action === 'FRN' && 
          <div className={styles.loginForm}>
            <div className={styles.formHead}>
              <h1>Forgot Resume Number</h1>
              <span className={`${styles.separator} ${styles.separatorfrn}`} />
        </div>
            <form>
              <MaterialInput
                type="text"
                className="block light"
                placeholder="Email Id"
                value={this.state.credentials.username}
                hasError={this.state.errors.username}
                errorMessage={INVALID_EMAIL}
                onChange={e => this.handleChange('username', e.target.value.trim())}
              />            
              <a className={['text-center', 'block', styles.forgotPassword, styles.msgclr].join(' ')}>
                  {this.state.message}
              </a>
              <button className="btn primary block" type="button" onClick={this.forgotReferenceNumber.bind(this)}>Submit</button>
              <a className={['text-center', 'block', styles.forgotPassword].join(' ')}></a>
              <button className="btn alert block" type="button" onClick={this.changeAction.bind(this, 'login')}>Cancel</button>
            </form>
          </div>}

        </div>}
      </div>
    );
  }
}

Login.defaultProps = {
  login: noop,
  dismissError: noop,
  error: false,
  action: ''
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
  error: PropTypes.bool,
  action: PropTypes.string
};

export default Login;
