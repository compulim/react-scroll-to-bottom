import random from 'math-random';

export default function useCSSKey() {
  return random()
    .toString(26)
    .substr(2, 5)
    .replace(/\d/g, value => String.fromCharCode(value.charCodeAt(0) + 65));
}
