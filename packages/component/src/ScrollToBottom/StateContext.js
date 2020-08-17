import React from 'react';

const context = React.createContext({
  animating: false,
  animatingToEnd: false,
  atBottom: true,
  atEnd: true,
  atStart: false,
  atTop: true,
  mode: 'bottom',
  sticky: true
});

context.displayName = 'ScrollToBottomStateContext';

export default context;
