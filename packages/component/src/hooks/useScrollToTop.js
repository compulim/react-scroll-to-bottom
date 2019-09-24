import { useContext } from 'react';

import FunctionContext from '../ScrollToBottom/FunctionContext';

export default function useScrollToTop() {
  const context = useContext(FunctionContext);

  return context.scrollToTop;
}
