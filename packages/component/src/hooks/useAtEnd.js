import { useContext } from 'react';

import StateContext from '../ScrollToBottom/StateContext';

export default function useAtEnd() {
  const context = useContext(StateContext);

  return [context.atEnd];
}
