/* eslint no-magic-numbers: "off" */

import random from 'math-random';

export default function useCSSKey() {
  return random()
    .toString(26)
    .substr(2, 5)
    .replace(/\d/gu, value => String.fromCharCode(value.charCodeAt(0) + 65));
}
