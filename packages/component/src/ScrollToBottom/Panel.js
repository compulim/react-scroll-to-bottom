import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import InternalContext from './InternalContext';
import useStyleToClassName from '../hooks/internal/useStyleToClassName';

const ROOT_STYLE = {
  height: '100%',
  overflowY: 'auto',
  width: '100%'
};

const Panel = ({ children, className }) => {
  const { setTarget } = useContext(InternalContext);
  const rootCSS = useStyleToClassName()(ROOT_STYLE);

  return (
    <div className={classNames(rootCSS, (className || '') + '')} ref={setTarget}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Panel;
