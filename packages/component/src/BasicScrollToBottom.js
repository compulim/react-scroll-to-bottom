import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import Composer from './ScrollToBottom/Composer';
import Context from './ScrollToBottom/Context';
import FollowButton from './ScrollToBottom/FollowButton';
import Panel from './ScrollToBottom/Panel';

const ROOT_CSS = css({
  position: 'relative'
});

export default props =>
  <Composer>
    <Context>
      { context =>
        <div className={ classNames(ROOT_CSS + '', props.className) }>
          <Panel>
            { props.children }
          </Panel>
          { !context.bottom && <FollowButton /> }
        </div>
      }
    </Context>
  </Composer>
