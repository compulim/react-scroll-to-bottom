import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useAnimatingToEnd() {
  const context = useContext(StateContext);

  return [context.animatingToEnd];
}
