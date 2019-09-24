import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import useScrollToEnd from '../hooks/useScrollToEnd';
import useSticky from '../hooks/useSticky';

const ROOT_CSS = css({
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
});

const AutoHideFollowButton = ({ children, className }) => {
  const [sticky] = useSticky();
  const scrollToEnd = useScrollToEnd();

  return (
    !sticky && (
      <button className={classNames(ROOT_CSS + '', (className || '') + '')} onClick={scrollToEnd} type="button">
        {children}
      </button>
    )
  );
};

export default AutoHideFollowButton;
