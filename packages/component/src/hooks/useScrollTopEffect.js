import { useContext, useEffect } from 'react';

import InternalContext from '../ScrollToBottom/InternalContext';

export default function useScrollTopEffect(fn) {
  const { addScrollTopEffect } = useContext(InternalContext);

  useEffect(() => fn && addScrollTopEffect(fn), [addScrollTopEffect, fn]);
}
