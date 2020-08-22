import useFunctionContext from './internal/useFunctionContext';

export default function useScrollTo() {
  const { scrollTo } = useFunctionContext();

  return scrollTo;
}
