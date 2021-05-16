import { useContext } from 'react';

import State1Context from '../../ScrollToBottom/State1Context';
import State2Context from '../../ScrollToBottom/State2Context';
import StateContext from '../../ScrollToBottom/StateContext';

const stateContexts = [StateContext, State1Context, State2Context];

export default function useStateContext(tier) {
  return useContext(stateContexts[tier] || stateContexts[0]);
}
