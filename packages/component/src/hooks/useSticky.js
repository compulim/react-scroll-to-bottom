import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useSticky() {
  const context = useContext(StateContext);

  return [context.sticky];
}
