import { useContext, useEffect } from 'react';

import InternalContext from '../ScrollToBottom/InternalContext';

export default function useObserveScrollPosition(observer, deps = []) {
  if (typeof observer !== 'function') {
    console.error('react-scroll-to-bottom: First argument passed to "useObserveScrollPosition" must be a function.');
  } else if (!Array.isArray(deps)) {
    console.error(
      'react-scroll-to-bottom: Second argument passed to "useObserveScrollPosition" must be an array if specified.'
    );
  }

  const { observeScrollPosition } = useContext(InternalContext);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => observer && observeScrollPosition(observer), [...deps, observeScrollPosition]);
}
