import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import authActions from '../../actions/auth';

import styles from './styles.css';

const defaultOptions = [
  { label: 'CPC', value: 'Campus Placement Coordinator' },
  { label: 'LCM', value: 'Location Campus Manager' },
  { label: 'NCM', value: 'National Campus Manager' },
  { label: 'CH', value: 'Campus Head' },
  { label: 'CSM', value: 'Campus Staffing Manager' },
  { label: 'CPM', value: 'Campus Programme Manager' },
  { label: 'COE', value: 'Campus Operation Executive' },
  { label: 'CA', value: 'Campus Admin' },
  { label: 'TPU', value: 'Technical Executive' },
  { label: 'HR', value: 'HR Executives' },
  { label: 'Candidate', value: 'Candidate' },
  { label: 'Campus Auditor', value: 'Campus Auditor' },
  { label: 'Admin', value: 'Admin' },
];

class ProfileSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }

  toggleOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    });
  }

  render() {
    const { showOptions } = this.state;
    const { options, className, switchProfile, profile } = this.props;
    const optionsEle = (
      <div className={styles.options}>
        {
          options.map((o, i) => (
            <div
              key={i}
              className={[styles.option,
                profile.value === o.value ? styles.active : ''].join(' ')}
              onClick={() => { this.toggleOptions(); switchProfile(o); }}
            >
              {o.value}
            </div>
          ))
        }
      </div>
    );

    return (
      <div className={[styles.wrap, showOptions ? styles.expand : '', className].join(' ')}>
        <div className={styles.label} onClick={this.toggleOptions}>
          <span>{profile.label}</span>
          <span className={[styles.toggleIcon, 'mobile-inline-block'].join(' ')} />
        </div>
        {
          showOptions &&
          <div>
            <div className={[styles.popup, 'desktop-block'].join(' ')}>
              {optionsEle}
            </div>
            <div className="mobile-block">
              {optionsEle}
            </div>
          </div>
        }
      </div>
    );
  }
}

ProfileSwitcher.defaultProps = {
  options: defaultOptions,
  className: '',
  switchProfile: noop,
  profile: {}
};

ProfileSwitcher.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  className: PropTypes.string,
  switchProfile: PropTypes.func,
  profile: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })
};

const mapStateToProps = state => ({ ...state.auth });

const matchDispatchToProps = dispatch => (
  bindActionCreators({
    ...authActions,
  }, dispatch));

export default connect(mapStateToProps, matchDispatchToProps)(ProfileSwitcher);
