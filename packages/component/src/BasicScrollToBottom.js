import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import AutoHideFollowButton from './ScrollToBottom/AutoHideFollowButton';
import Composer from './ScrollToBottom/Composer';
import Panel from './ScrollToBottom/Panel';
import useStyleToClassName from './hooks/internal/useStyleToClassName';

const ROOT_STYLE = {
  position: 'relative'
};

const BasicScrollToBottomCore = ({ children, className, followButtonClassName, scrollViewClassName }) => {
  const rootCSS = useStyleToClassName()(ROOT_STYLE);

  return (
    <div className={classNames(rootCSS + '', (className || '') + '')}>
      <Panel className={(scrollViewClassName || '') + ''}>{children}</Panel>
      <AutoHideFollowButton className={(followButtonClassName || '') + ''} />
    </div>
  );
};

BasicScrollToBottomCore.defaultProps = {
  children: undefined,
  className: undefined,
  followButtonClassName: undefined,
  scrollViewClassName: undefined
};

BasicScrollToBottomCore.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  followButtonClassName: PropTypes.string,
  scrollViewClassName: PropTypes.string
};

const BasicScrollToBottom = ({
  checkInterval,
  children,
  className,
  debounce,
  followButtonClassName,
  mode,
  nonce,
  scrollViewClassName
}) => {
  const styleToClassName = useStyleToClassName();

  const rootCSS = styleToClassName(ROOT_STYLE);

  return (
    <Composer checkInterval={checkInterval} debounce={debounce} mode={mode} nonce={nonce}>
      <BasicScrollToBottomCore
        className={className}
        followButtonClassName={followButtonClassName}
        scrollViewClassName={scrollViewClassName}
      >
        {children}
      </BasicScrollToBottomCore>
    </Composer>
  );
};

BasicScrollToBottom.defaultProps = {
  checkInterval: undefined,
  children: undefined,
  className: undefined,
  debounce: undefined,
  followButtonClassName: undefined,
  mode: undefined,
  nonce: undefined,
  scrollViewClassName: undefined
};

BasicScrollToBottom.propTypes = {
  checkInterval: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  debounce: PropTypes.number,
  followButtonClassName: PropTypes.string,
  mode: PropTypes.oneOf(['bottom', 'top']),
  nonce: PropTypes.string,
  scrollViewClassName: PropTypes.string
};

export default BasicScrollToBottom;
