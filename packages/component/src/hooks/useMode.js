import useStateContext from './internal/useStateContext';

export default function useMode() {
  const { mode } = useStateContext(1);

  return [mode];
}
