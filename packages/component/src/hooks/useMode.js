import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useMode() {
  const context = useContext(StateContext);

  return [context.mode];
}
