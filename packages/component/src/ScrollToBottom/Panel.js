import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import InternalContext from './InternalContext';

const ROOT_CSS = css({
  height: '100%',
  overflowY: 'auto',
  width: '100%'
});

class Panel extends React.Component {
  componentDidUpdate() {
    this.props.handleUpdate();
  }

  render() {
    const { props } = this;

    return (
      <div
        className={ classNames(ROOT_CSS + '', (props.className || '') + '') }
        ref={ props.setTarget }
      >
        { props.children }
      </div>
    );
  }
}

export default props =>
  <InternalContext.Consumer>
    { ({ _handleUpdate, _setTarget }) =>
      <Panel
        handleUpdate={ _handleUpdate }
        setTarget={ _setTarget }
        { ...props }
      />
    }
  </InternalContext.Consumer>
