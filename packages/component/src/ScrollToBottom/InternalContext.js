import React from 'react';

const context = React.createContext({
  _handleUpdate: () => 0,
  _setTarget: () => 0
});

context.displayName = 'ScrollToBottomInternalContext';

export default context;
