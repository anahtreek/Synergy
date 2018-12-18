import React from 'react';
import PropTypes from 'prop-types';
import { noop, pull, cloneDeep } from 'lodash';
import ToggleInput from '../ToggleInput';
import styles from './styles.css';

const Select = ({ className, value, isOpen, options, onChange, toggle, hasError, multi }) => {
  const selected = cloneDeep(value);
  return (
    <div
      className={`select ${styles.select} ${className} ${isOpen ? styles.open : ''} ${hasError ? styles.error : ''}`}
      onClick={toggle}
    >
      <div className={styles.value}>{multi ? value.join() : value}</div>
      <span className={styles.chevron} />
      {
        isOpen &&
        <ul className={`${styles.options} select-options`}>
          {
            options.map((option, i) => (
              <li
                className={styles.option}
                key={i}
                onClick={
                  (e) => {
                    if (multi) {
                      e.stopPropagation();
                    } else {
                      onChange({ target: { value: option } });
                    }
                  }
                }
              >
                {
                  multi ?
                    <div className={styles.toggleInput}>
                      <ToggleInput
                        checked={value.indexOf(option) > -1}
                        type="checkbox"
                        onChange={
                          (v) => {
                            if (v) {
                              selected.push(option);
                            } else {
                              pull(selected, option);
                            }
                            onChange({ target: { value: selected } });
                          }
                        }
                      />
                      <span className={styles.label}>{option}</span>
                    </div>
                    : option
                }
              </li>
            ))
          }
        </ul>
      }
    </div>
  );
};

Select.defaultProps = {
  options: [],
  onChange: noop,
  className: '',
  value: '',
  isOpen: false,
  toggle: noop,
  hasError: false,
  multi: false,
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
    PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
  isOpen: PropTypes.bool,
  hasError: PropTypes.bool,
  multi: PropTypes.bool,
};

export default Select;
