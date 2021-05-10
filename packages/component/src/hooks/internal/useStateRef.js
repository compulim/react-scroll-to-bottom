import { useCallback, useRef, useState } from 'react';

export default function useStateRef(initialState) {
  const [state, setState] = useState(initialState);
  const ref = useRef();
  const setValue = useCallback(
    nextValue => {
      if (typeof nextValue === 'function') {
        setValue(state => {
          nextValue = nextValue(state);

          ref.current = nextValue;

          return nextValue;
        });
      } else {
        ref.current = nextValue;

        setValue(nextValue);
      }
    },
    [ref, setState]
  );

  ref.current = state;

  return [state, setState, ref];
}
