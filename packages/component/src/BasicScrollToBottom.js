import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import AutoHideFollowButton from './ScrollToBottom/AutoHideFollowButton';
import Composer from './ScrollToBottom/Composer';
import Panel from './ScrollToBottom/Panel';

const ROOT_CSS = css({
  position: 'relative'
});

export default props =>
  <Composer
    debounce={ props.debounce }
    mode={ props.mode === 'top' ? 'top' : 'bottom'}
    threshold={ props.threshold }
  >
    <div className={ classNames(ROOT_CSS + '', (props.className || '') + '') }>
      <Panel className={ props.scrollViewClassName }>
        { props.children }
      </Panel>
      <AutoHideFollowButton className={ props.followButtonClassName } />
    </div>
  </Composer>
