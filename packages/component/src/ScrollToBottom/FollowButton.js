import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import Context from './Context';

const ROOT_CSS = css({
  position: 'absolute',
  right: 0,
  top: 0
});

export default props =>
  <Context.Consumer>
    { context =>
      <button
        className={ classNames(ROOT_CSS + '', props.className) }
        onClick={ context.scrollToBottom }
      >
        <span rel="image">⚫</span>
      </button>
    }
  </Context.Consumer>
