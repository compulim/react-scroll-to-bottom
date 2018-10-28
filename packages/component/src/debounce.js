export default function (fn, ms) {
  if (!ms) {
    return fn;
  }

  let last = 0;
  let timeout = null;

  return function () {
    const now = Date.now();

    if (now - last > ms) {
      fn.apply(null, arguments);
      last = now;
    } else {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        fn.apply(null, arguments);
        last = Date.now();
      }, Math.max(0, ms - now + last));
    }
  };
}
