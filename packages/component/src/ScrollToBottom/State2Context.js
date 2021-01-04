import React from 'react';

const context = React.createContext({
  animating: false,
  animatingToEnd: false,
  sticky: true
});

context.displayName = 'ScrollToBottomState2Context';

export default context;
