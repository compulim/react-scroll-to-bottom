import { css } from 'glamor';
import classNames from 'classnames';
import React, { useContext } from 'react';

import InternalContext from './InternalContext';

const ROOT_CSS = css({
  height: '100%',
  overflowY: 'auto',
  width: '100%'
});

const Panel = ({ children, className }) => {
  const { setTarget } = useContext(InternalContext);

  return (
    <div
      className={ classNames(ROOT_CSS + '', (className || '') + '') }
      ref={ setTarget }
    >
      { children }
    </div>
  );
}

export default Panel
