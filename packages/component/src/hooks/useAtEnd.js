import useStateContext from './internal/useStateContext';

export default function useAtEnd() {
  const { atEnd } = useStateContext(1);

  return [atEnd];
}
