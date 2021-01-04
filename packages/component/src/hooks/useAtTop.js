import useStateContext from './internal/useStateContext';

export default function useAtTop() {
  const { atTop } = useStateContext(1);

  return [atTop];
}
