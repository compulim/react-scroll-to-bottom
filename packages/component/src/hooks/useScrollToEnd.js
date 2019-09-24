import { useContext } from 'react';

import FunctionContext from '../ScrollToBottom/FunctionContext';

export default function useScrollToEnd() {
  const context = useContext(FunctionContext);

  return context.scrollToEnd;
}
