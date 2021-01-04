import { useContext } from 'react';

import StateContext from '../../ScrollToBottom/StateContext';
import State1Context from '../../ScrollToBottom/State1Context';
import State2Context from '../../ScrollToBottom/State2Context';

const stateContexts = [StateContext, State1Context, State2Context];

export default function useStateContext(tier) {
  return useContext(stateContexts[tier] || stateContexts[0]);
}
