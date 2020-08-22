import useInternalContext from './useInternalContext';

export default function useStyleToClassName() {
  const { styleToClassName } = useInternalContext();

  return styleToClassName;
}
