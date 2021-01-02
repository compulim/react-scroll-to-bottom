import React from 'react';

const context = React.createContext({
  atBottom: true,
  atEnd: true,
  atStart: false,
  atTop: true,
  mode: 'bottom'
});

context.displayName = 'ScrollToBottomState1Context';

export default context;
