import { useContext } from 'react';

import FunctionContext from '../ScrollToBottom/FunctionContext';

export default function useScrollTo() {
  const context = useContext(FunctionContext);

  return context.scrollTo;
}
