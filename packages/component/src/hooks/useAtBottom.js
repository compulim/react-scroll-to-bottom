import useStateContext from './internal/useStateContext';

export default function useAtBottom() {
  const { atBottom } = useStateContext(1);

  return [atBottom];
}
