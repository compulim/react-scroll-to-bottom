import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useAnimating() {
  const context = useContext(StateContext);

  return [context.animating];
}
