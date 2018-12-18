import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { noop } from 'lodash';
import authActions from '../../actions/auth';
// Components
import PageHeader from '../../components/PageHeader';


// Style
import styles from './styles.css';

const navRoutes = [
  // { title: 'Home', url: '/candidate' },
  // { title: 'Feedback', url: '/candidate/feedback' },
  // { title: 'Help Desk', url: '/candidate/help-desk' },
  // { title: 'Audit Clarification', url: '/candidate/audit-clarification' },
];

class DashboardCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.currentStep? this.props.currentStep: 'register',
      showPlay: false,
      event: null
    };
  }

 

  render() {

    const { type } = this.state;
    const { submitResume, resumeSubmitted, event, updateType, newsNVideos } = this.props;

    const enableIcons = {
      mW: "N",
      search: "N",
      roles: "N",
      help: "N"
    }

    return (
      <div className={styles.candidPageWrapper}>
        <PageHeader
          logout={this.props.logout}
          routes={navRoutes}
          currentRoute={{}}
          title="Dashboard"
          profileLink="/candidate/profile"
          roles={[]}
          enableIcons={enableIcons}
        />
      </div>);
  }
}

DashboardCandidate.defaultProps = {
  logout: noop,
  submitResume: noop,
  resumeSubmitted: false,
  event: null,
  loadCandidateEvent: noop,
  updateCurrentStep: noop,
  currentStep: null,
  clearThisData: noop,
  user: '',
  loadCandidateVideosNNews: noop,
  newsNVideos: null
};

DashboardCandidate.propTypes = {
  logout: PropTypes.func.isRequired,
  submitResume: PropTypes.func,
  resumeSubmitted: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  event: PropTypes.object,
  loadCandidateEvent: PropTypes.func,
  updateCurrentStep: PropTypes.func,
  currentStep: PropTypes.string,
  clearThisData: PropTypes.func,
  user: PropTypes.string,
  loadCandidateVideosNNews: PropTypes.func,
  newsNVideos: PropTypes.object
};

const mapStateToProps = state => ({ ...state.auth,  });

const matchDispatchToProps = dispatch => (
  bindActionCreators({ ...authActions}, dispatch));

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(DashboardCandidate));
