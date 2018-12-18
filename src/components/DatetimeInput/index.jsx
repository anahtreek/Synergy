import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Datetime from 'react-datetime';
import '!style-loader!css-loader!react-datetime/css/react-datetime.css'; // eslint-disable-line
import styles from './styles.css';

class DatetimeInput extends Component {
  constructor() {
    super();
    this.state = {
      badInput: false,
    };
  }

  componentDidMount() {
    const dateFields = document.querySelectorAll('.date-material');
    for (let i = 0; i < dateFields.length; i += 1) {
      dateFields[i].readOnly = true;
    }
  }

  handleDate = (momentsObj) => {
    const { models, formats, subModel, index } = this.props;
    if (!subModel.length > 0) {
      this.props.onChange(models, momentsObj.format(formats));
    } else if (index > -1) {
      this.props.onChange(models, subModel, momentsObj.format(formats), index);
    } else {
      this.props.onChange(models, subModel, momentsObj.format(formats));
    }
  }

  handleTime = (momentsObj) => {
    const { models } = this.props;
    this.props.onChange(models, momentsObj.format('hh:mm A'));
  }

  render() {
    const {
      className,
      hasError,
      errorMessage,
      type,
      placeholder,
      value,
      required,
    } = this.props;
    const { badInput } = this.state;
    return (
      <div
        className={`${styles.container} ${className} ${hasError || badInput ? styles.error : ''}`}
      >
        <div className={`${styles.group}`}>
          { type === 'date' &&
            <Datetime
              inputProps={{
                className: `${styles.material} date-material`,
                value,
              }}
              onChange={this.handleDate}
              closeOnSelect
              timeFormat={false}
            />
          }

          { type === 'time' &&
            <Datetime
              inputProps={{
                className: `${styles.material} date-material`,
                value,
              }}
              onChange={this.handleTime}
              closeOnSelect
              dateFormat={false}
            />
          }

          <label className={`${styles.label} ${(value.length > 0) ? styles.focused : ''}`}>
            {placeholder}
            {
              required &&
              <span className={styles.asterisk}>*</span>
            }
          </label>
          { this.props.icons === true &&
            <span className={`${type === 'date' ? styles.calendarIcon : styles.clockIcon}`} />
          }
        </div>
        {hasError && <span className={styles.errorMessage}>{errorMessage}</span>}
        {badInput && <span className={styles.errorMessage}>Invalid input</span>}
      </div>
    );
  }
}

DatetimeInput.defaultProps = {
  type: 'date',
  placeholder: '',
  options: [],
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  value: '',
  className: '',
  hasError: false,
  errorMessage: '',
  required: false,
  icons: true,
  models: '',
  formats: 'DD - MMM - YYYY',
  subModel: '',
  index: -1,
};

DatetimeInput.propTypes = {
  type: PropTypes.oneOf(['date', 'time']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  models: PropTypes.string,
  formats: PropTypes.string,
  required: PropTypes.bool,
  icons: PropTypes.bool,
  subModel: PropTypes.string,
  index: PropTypes.number,
};

export default DatetimeInput;
