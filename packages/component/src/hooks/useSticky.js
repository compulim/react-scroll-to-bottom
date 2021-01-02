import useStateContext from './internal/useStateContext';

export default function useSticky() {
  const { sticky } = useStateContext(2);

  return [sticky];
}
