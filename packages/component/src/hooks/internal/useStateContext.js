import { useContext } from 'react';

import State1Context from '../../ScrollToBottom/State1Context';
import State2Context from '../../ScrollToBottom/State2Context';

export default function useStateContext(tier) {
  return useContext(tier === 2 ? State2Context : State1Context);
}
