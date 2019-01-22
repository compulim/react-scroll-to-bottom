import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import AutoHideFollowButton from './ScrollToBottom/AutoHideFollowButton';
import Composer from './ScrollToBottom/Composer';
import Panel from './ScrollToBottom/Panel';

const ROOT_CSS = css({
  position: 'relative'
});

export default ({
  checkInterval,
  children,
  className,
  debounce,
  followButtonClassName,
  mode,
  scrollViewClassName
}) =>
  <Composer
    checkInterval={ checkInterval }
    debounce={ debounce }
    mode={ mode === 'top' ? 'top' : 'bottom'}
  >
    <div className={ classNames(ROOT_CSS + '', (className || '') + '') }>
      <Panel className={ scrollViewClassName }>
        { children }
      </Panel>
      <AutoHideFollowButton className={ followButtonClassName } />
    </div>
  </Composer>
