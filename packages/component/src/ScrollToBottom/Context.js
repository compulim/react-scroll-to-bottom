import React from 'react';

export default React.createContext({
  atBottom: true,
  atEnd: true,
  atTop: true,
  mode: 'bottom',
  handleUpdate: () => 0,
  scrollToBottom: () => 0,
  scrollToEnd: () => 0,
  scrollToTop: () => 0,
  scrollTop: null,
  setTarget: () => 0,
  target: null,
  threshold: 10
});
