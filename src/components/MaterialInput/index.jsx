import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import TextareaAutosize from 'react-textarea-autosize';
import requireImage from '../../requireImage';
import Select from '../Select';
import styles from './styles.css';

const numberReg = /^[0-9\b]+$/;
class MaterialInput extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      container: null,
      badInput: false,
    };

    this.getContainer = this.getContainer.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true);
  }

  getContainer(ref) {
    this.setState({ container: ref });
  }

  handle(e) {
    const el = this.state.container;
    if (!el) return;
    if (!el.contains(e.target)) this.setState({ isOpen: false });
  }

  hasContent() {
    const { value } = this.props;

    if (value === undefined || value === null) {
      return false;
    }

    return value.toString() !== '';
  }

  render() {
    const {
      className,
      hasError,
      errorMessage,
      type,
      placeholder,
      options,
      onChange,
      onBlur,
      onFocus,
      value,
      required,
      onAttach,
      multi,
      readOnly,
      maxLength
    } = this.props;

    const { badInput, isOpen } = this.state;
    return (
      <div
        ref={this.getContainer}
        className={`${styles.materialGroup} ${className} ${hasError || badInput ? styles.error : ''}`}
      >
        {
          type === 'select' &&
            <Select
              options={options}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              toggle={() => this.setState({ isOpen: !isOpen })}
              isOpen={isOpen}
              className={`${styles.select} ${styles.material} ${this.hasContent() ? [styles.hasContent, 'has-content'].join(' ') : ''}`}
              value={value}
              hasError={hasError}
              multi={multi}
            />
        }
        {
          type === 'auto-autosize-textarea' &&
            <TextareaAutosize
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={`${styles.material} ${this.hasContent() ? [styles.hasContent, 'has-content'].join(' ') : ''}`}
              value={value}
            />
        }
        {
          type !== 'select' && type !== 'file' && type !== 'auto-autosize-textarea' &&
            <input
              type={type === 'password' ? 'password' : 'text'}
              onChange={(e) => {
                if (type === 'number') {
                  if (numberReg.test(e.target.value)) {
                    onChange(e);
                  }
                } else {
                  onChange(e);
                }
              }}
              onFocus={onFocus}
              onBlur={(e) => {
                this.setState({ badInput: e.nativeEvent.target.validity.badInput });
                onBlur(e);
              }}
              className={`${styles.material} ${this.hasContent() || badInput ? [styles.hasContent, 'has-content'].join(' ') : ''}`}
              value={value}
              required={required}
              readOnly={readOnly}
              maxLength={maxLength}
            />
        }
        {
          type === 'file' &&
            <div className={`${styles.fileUploadComponent} ${styles.material} ${this.hasContent() || badInput ? styles.hasContent : ''}`}>
              <i onClick={() => onAttach(value)} className={`${styles.uploadIcon}`}><img src={requireImage('./i/icons/upload-icon.png')} alt={''} /></i>
              <input
                type={type}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={(e) => {
                  this.setState({ badInput: e.nativeEvent.target.validity.badInput });
                  onBlur(e);
                }}
                className={`${styles.fileUpload} ${styles.material}`}
               // value={value}
                required={required}
              />
              <input
                type={'text'}
                className={`${styles.material}`}
                value={value}
              />
            </div>
        }
        <label className={styles.label}>
          {placeholder}
          {
            required &&
            <span className={styles.asterisk}>*</span>
          }
        </label>
        {hasError && errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        {badInput && <span className={styles.errorMessage}>Invalid input</span>}
      </div>
    );
  }
}

MaterialInput.defaultProps = {
  type: 'text',
  placeholder: '',
  options: [],
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  onAttach: noop,
  value: '',
  className: '',
  hasError: false,
  errorMessage: '',
  required: false,
  multi: false,
  readOnly: false,
  maxLength: 100
};

MaterialInput.propTypes = {
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onAttach: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
    PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
  className: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  multi: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number
};

export default MaterialInput;
