import { useContext } from 'react';

import InternalContext from '../../ScrollToBottom/InternalContext';

export default function useInternalContext() {
  return useContext(InternalContext);
}
