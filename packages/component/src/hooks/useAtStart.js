import useStateContext from './internal/useStateContext';

export default function useAtStart() {
  const { atStart } = useStateContext();

  return [atStart];
}
