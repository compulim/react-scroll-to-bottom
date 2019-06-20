import React from 'react';

const context = React.createContext({
  scrollTo: () => 0,
  scrollToBottom: () => 0,
  scrollToEnd: () => 0,
  scrollToStart: () => 0,
  scrollToTop: () => 0
});

context.displayName = 'ScrollToBottomFunctionContext';

export default context;
