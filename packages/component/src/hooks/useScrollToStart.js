import { useContext } from 'react';

import FunctionContext from '../ScrollToBottom/FunctionContext';

export default function useScrollToStart() {
  const context = useContext(FunctionContext);

  return context.scrollToStart;
}
