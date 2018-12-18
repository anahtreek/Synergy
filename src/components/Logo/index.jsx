import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Logo = ({ size, title }) => (
  <div className={`${styles.logo} ${size}`}>
    <span className={styles.circle} />
    <span className={styles.title}>{title}</span>
  </div>
);

Logo.defaultProps = {
  size: 'md',
  title: 'Campus',
};

Logo.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
};

export default Logo;
