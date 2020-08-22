import useStateContext from './internal/useStateContext';

export default function useAtBottom() {
  const { atBottom } = useStateContext();

  return [atBottom];
}
