import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import InternalContext from './InternalContext';

const ROOT_CSS = css({
  height: '100%',
  overflowY: 'auto',
  width: '100%'
});

const Panel = ({ children, className, setTarget }) =>
  <div
    className={ classNames(ROOT_CSS + '', (className || '') + '') }
    ref={ setTarget }
  >
    { children }
  </div>

export default props =>
  <InternalContext.Consumer>
    { ({ setTarget }) =>
      <Panel
        setTarget={ setTarget }
        { ...props }
      />
    }
  </InternalContext.Consumer>
