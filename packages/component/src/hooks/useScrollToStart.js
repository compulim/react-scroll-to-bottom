import useFunctionContext from './internal/useFunctionContext';

export default function useScrollToStart() {
  const { scrollToStart } = useFunctionContext();

  return scrollToStart;
}
