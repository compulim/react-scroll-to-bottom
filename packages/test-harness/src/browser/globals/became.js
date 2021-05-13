import became from '../assertions/became';

export default function () {
  return window.became || (window.became = became);
}
