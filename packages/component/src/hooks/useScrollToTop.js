import useFunctionContext from './internal/useFunctionContext';

export default function useScrollToTop() {
  const { scrollToTop } = useFunctionContext();

  return scrollToTop;
}
