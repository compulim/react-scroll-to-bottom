import React from 'react';

const context = React.createContext({
  animating: false,
  atBottom: true,
  atEnd: true,
  atTop: true,
  mode: 'bottom',
  sticky: true
});

context.displayName = 'ScrollToBottomStateContext';

export default context
