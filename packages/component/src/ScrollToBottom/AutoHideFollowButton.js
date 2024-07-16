import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useScrollToEnd from '../hooks/useScrollToEnd';
import useSticky from '../hooks/useSticky';
import useStyleToClassName from '../hooks/internal/useStyleToClassName';

const ROOT_STYLE = {
  backgroundColor: 'rgba(0, 0, 0, .2)',
  borderRadius: 10,
  borderWidth: 0,
  bottom: 5,
  cursor: 'pointer',
  height: 20,
  outline: 0,
  position: 'absolute',
  right: 20,
  width: 20,

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },

  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }
};

const AutoHideFollowButton = ({ children, className = '' }) => {
  const [sticky] = useSticky();
  const rootCSS = useStyleToClassName()(ROOT_STYLE);
  const scrollToEnd = useScrollToEnd();

  return (
    !sticky && (
      <button className={classNames(rootCSS, (className || '') + '')} onClick={scrollToEnd} type="button">
        {children}
      </button>
    )
  );
};

AutoHideFollowButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default AutoHideFollowButton;
