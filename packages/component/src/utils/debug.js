/* eslint no-console: ["off"] */
/* global process */

import styleConsole from './styleConsole';

const { NODE_ENV } = (process && process.env) || {};

function format(category, arg0, ...args) {
  return [`%c${category}%c ${arg0}`, ...styleConsole('green', 'white'), ...args];
}

export default function debug(category, { force = false } = {}) {
  if (!force && NODE_ENV !== 'development') {
    return () => 0;
  }

  return (...args) => {
    if (!args.length) {
      return;
    }

    const lines = Array.isArray(args[0]) ? args : [args];
    const oneLiner = lines.length === 1;

    lines.forEach((line, index) => {
      if (oneLiner) {
        console.log(...format(category, ...line));
      } else if (index) {
        console.log(...(Array.isArray(line) ? line : [line]));
      } else {
        console.groupCollapsed(...format(category, ...line));
      }
    });

    oneLiner || console.groupEnd();
  };
}
