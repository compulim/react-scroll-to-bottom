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
  <Composer>
    <div className={ classNames(ROOT_CSS + '', props.className) }>
      <Panel>
        { props.children }
      </Panel>
      <AutoHideFollowButton className={ props.followButtonClassName } />
    </div>
  </Composer>
