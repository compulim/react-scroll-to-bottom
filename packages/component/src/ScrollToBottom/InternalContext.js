import React from 'react';

const context = React.createContext({
  offsetHeight: 0,
  scrollHeight: 0,
  setTarget: () => 0,
  styleToClassName: () => ''
});

context.displayName = 'ScrollToBottomInternalContext';

export default context;
