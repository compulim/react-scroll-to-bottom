import useFunctionContext from './internal/useFunctionContext';

export default function useScrollToBottom() {
  const { scrollToBottom } = useFunctionContext();

  return scrollToBottom;
}
