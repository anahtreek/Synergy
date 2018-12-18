import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styles from './styles.css';

class ToggleInput extends Component {
  constructor(props) {
    super();

    this.className = props.className || '';
    this.className += ` ${styles[`${props.type}Input`]}`;

    const hasLabels = !!(props.trueValue || props.falseValue);
    if (hasLabels) {
      this.className += ` ${styles.toggleOnOff}`;
    }

    this.state = {
      checked: props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({ ...this.state, checked: nextProps.checked });
    }
  }

  handleChange(ev) {
    const { checked } = ev.target;
    this.setState({ ...this.state, checked });

    this.props.onChange(checked);
  }

  render() {
    const { checked } = this.state;

    return (
      <label className={`${styles.toggleWrap} ${this.className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => this.handleChange(e)}
        />
        <span
          className={styles.toggleBtn}
          data-on={this.props.trueValue || 'ON'}
          data-off={this.props.falseValue || 'OFF'}
        />
        <span className={['text-label', styles.textLabel].join(' ')}>{this.props.children}</span>
      </label>
    );
  }
}

ToggleInput.defaultProps = {
  children: '',
  className: '',
  checked: false,
  onChange: noop,
  trueValue: '',
  falseValue: '',
  type: 'toggle',
};

ToggleInput.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  trueValue: PropTypes.string,
  falseValue: PropTypes.string,
  type: PropTypes.oneOf(['toggle', 'checkbox']),
};

export default ToggleInput;
