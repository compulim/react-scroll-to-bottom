import useFunctionContext from './internal/useFunctionContext';

export default function useScrollToEnd() {
  const { scrollToEnd } = useFunctionContext();

  return scrollToEnd;
}
