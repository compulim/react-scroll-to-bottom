import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useAtBottom() {
  const context = useContext(StateContext);

  return [context.atBottom];
}
