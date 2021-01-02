import useStateContext from './internal/useStateContext';

export default function useAnimatingToEnd() {
  const { animatingToEnd } = useStateContext(2);

  return [animatingToEnd];
}
