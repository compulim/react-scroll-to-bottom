import became from './became';

export default function stabilized(name, getValue, count, timeout) {
  const values = [];

  return became(
    `${name} stabilized after ${count} counts`,
    async () => {
      const value = getValue();

      // Push the current value into the bucket.
      values.push(value);

      // We only need the last X values.
      while (values.length > count) {
        values.shift();
      }

      // Check if we already got X number of values, and all of them are the same value.
      if (values.length === count && values.every(value => Object.is(value, values[0]))) {
        return true;
      }

      // If not, sleep for a frame and check again.
      await new Promise(requestAnimationFrame);

      return false;
    },
    timeout
  );
}
