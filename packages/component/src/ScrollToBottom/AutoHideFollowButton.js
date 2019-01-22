import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import FunctionContext from './FunctionContext';
import StateContext from './StateContext';

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

export default ({ children, className }) =>
  <StateContext.Consumer>
    { ({ sticky }) => !sticky &&
      <FunctionContext.Consumer>
        { ({ scrollToEnd }) =>
          <button
            className={ classNames(ROOT_CSS + '', (className || '') + '') }
            onClick={ scrollToEnd }
          >
            { children }
          </button>
        }
      </FunctionContext.Consumer>
    }
  </StateContext.Consumer>
