import { css } from 'glamor';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import AutoHideFollowButton from './ScrollToBottom/AutoHideFollowButton';
import Composer from './ScrollToBottom/Composer';
import Panel from './ScrollToBottom/Panel';

const ROOT_CSS = css({
  position: 'relative'
});

const BasicScrollToBottom = ({
  checkInterval,
  children,
  className,
  debounce,
  followButtonClassName,
  mode,
  scrollViewClassName
}) => (
  <Composer checkInterval={checkInterval} debounce={debounce} mode={mode}>
    <div className={classNames(ROOT_CSS + '', (className || '') + '')}>
      <Panel className={scrollViewClassName}>{children}</Panel>
      <AutoHideFollowButton className={followButtonClassName} />
    </div>
  </Composer>
);

BasicScrollToBottom.defaultProps = {
  checkInterval: undefined,
  children: undefined,
  className: undefined,
  debounce: undefined,
  followButtonClassName: undefined,
  mode: undefined,
  scrollViewClassName: undefined
};

BasicScrollToBottom.propTypes = {
  checkInterval: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  debounce: PropTypes.number,
  followButtonClassName: PropTypes.string,
  mode: PropTypes.oneOf(['bottom', 'top']),
  scrollViewClassName: PropTypes.string
};

export default BasicScrollToBottom;
