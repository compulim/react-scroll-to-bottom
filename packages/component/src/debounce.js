export default function (fn, ms) {
  if (!ms) {
    return fn;
  }

  let last = 0;
  let timeout = null;

  return (...args) => {
    const now = Date.now();

    if (now - last > ms) {
      fn(...args);
      last = now;
    } else {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        fn(...args);
        last = Date.now();
      }, Math.max(0, ms - now + last));
    }
  };
}
