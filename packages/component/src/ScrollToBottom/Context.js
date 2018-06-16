import React from 'react';

export default React.createContext({
  bottom: true,
  handleUpdate: () => 0,
  scrollToBottom: () => 0,
  scrollTop: null,
  target: null
});
