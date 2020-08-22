import useStateContext from './internal/useStateContext';

export default function useAnimating() {
  const { animating } = useStateContext();

  return [animating];
}
