import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const LoadingIndicator = ({ className }) => (
  <div className={`${styles.spinner} ${className}`} />
);

LoadingIndicator.defaultProps = {
  className: '',
};

LoadingIndicator.propTypes = {
  className: PropTypes.string,
};

export default LoadingIndicator;
