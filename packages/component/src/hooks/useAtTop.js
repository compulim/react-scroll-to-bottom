import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useAtTop() {
  const context = useContext(StateContext);

  return [context.atTop];
}
