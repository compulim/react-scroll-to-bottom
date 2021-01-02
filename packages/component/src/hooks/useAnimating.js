import useStateContext from './internal/useStateContext';

export default function useAnimating() {
  const { animating } = useStateContext(2);

  return [animating];
}
