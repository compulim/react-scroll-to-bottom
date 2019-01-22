import React from 'react';

const context = React.createContext({
  atBottom: true,
  atEnd: true,
  atTop: true,
  mode: 'bottom'
});

context.displayName = 'ScrollToBottomStateContext';

export default context
