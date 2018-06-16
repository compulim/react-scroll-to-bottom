import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import Context from './Context';

const ROOT_CSS = css({
  height: '100%',
  overflowY: 'auto',
  width: '100%'
});

export default class ScrollToBottomPanel extends React.PureComponent {
  componentDidUpdate() {
    this.context && this.context.handleUpdate();
  }

  render() {
    const { props } = this;

    return (
      <Context.Consumer>
        { context => {
          this.context = context;

          return (
            <div
              className={ classNames(ROOT_CSS + '', props.className) }
              ref={ context.target }
            >
              { props.children }
            </div>
          );
        } }
      </Context.Consumer>
    );
  }
}
