import useStateContext from './internal/useStateContext';

export default function useMode() {
  const { mode } = useStateContext();

  return [mode];
}
