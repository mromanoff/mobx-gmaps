import './Icons.css';

import React from 'react';
import PropTypes from 'prop-types';


const Icon = ({className}) =>
  <svg
    className={className}
    width="40"
    height="60"
    viewBox="0 0 40 60"
    xmlns="http://www.w3.org/2000/svg">

    <title>Pin</title>

    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 1C9 1 1 10.06 1 20c0 5.96 2.107 9.23 4.918 15.002C11.548 46.56 20 58.998 20 58.998S28.453 46.56 34.082 35C36.892 29.23 39 25.957 39 20c0-9.938-8-19-19-19zm0 30.714c-6.074 0-11-4.925-11-11s4.926-11 11-11c6.076 0 11 4.925 11 11s-4.924 11-11 11z"/>
  </svg>;

Icon.propTypes = {
  className: PropTypes.string,
};

export default Icon;
