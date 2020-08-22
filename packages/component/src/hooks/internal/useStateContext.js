import { useContext } from 'react';

import StateContext from '../../ScrollToBottom/StateContext';

export default function useStateContext() {
  return useContext(StateContext);
}
