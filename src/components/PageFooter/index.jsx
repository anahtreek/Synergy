import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const PageFooter = ({ className }) => {
  const curYear = new Date().getFullYear();
  return (
    <div className={[styles.footer, className].join(' ')}>
      <div>
        © <span className={styles.mShow}> {curYear} </span> Wipro Ltd
        <span className={styles.mHide}>, {curYear} </span>. All Rights Reserved.
        <span className={styles.mHide}>Terms and Conditions</span>
      </div>
    </div>
  );
};

PageFooter.defaultProps = {
  className: '',
};

PageFooter.propTypes = {
  className: PropTypes.string,
};

export default PageFooter;
