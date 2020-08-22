import useStateContext from './internal/useStateContext';

export default function useAtEnd() {
  const { atEnd } = useStateContext();

  return [atEnd];
}
