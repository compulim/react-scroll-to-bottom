import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useAtStart() {
  const context = useContext(StateContext);

  return [context.atStart];
}
