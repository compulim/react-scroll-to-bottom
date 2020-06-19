import { useContext, useEffect } from 'react';

import InternalContext from '../ScrollToBottom/InternalContext';

export default function useObserveScrollTop(observer, deps = []) {
  if (typeof observer !== 'function') {
    console.error('react-scroll-to-bottom: First argument passed to "useObserveScrollTop" must be a function.');
  } else if (!Array.isArray(deps)) {
    console.error(
      'react-scroll-to-bottom: Second argument passed to "useObserveScrollTop" must be an array if specified.'
    );
  }

  const { observeScrollTop } = useContext(InternalContext);

  useEffect(() => observer && observeScrollTop(observer), [...deps, observeScrollTop]);
}
