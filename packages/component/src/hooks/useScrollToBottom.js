import { useContext } from 'react';

import FunctionContext from '../ScrollToBottom/FunctionContext';

export default function useScrollToBottom() {
  const context = useContext(FunctionContext);

  return context.scrollToBottom;
}
