import stabilized from "../assertions/stabilized";

export default function () {
  return window.stabilized || (window.stabilized = stabilized);
}
