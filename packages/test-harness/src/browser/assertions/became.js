export default async function became(message, fn, timeout) {
  if (typeof timeout !== "number") {
    throw new Error('"timeout" argument must be set.');
  }

  for (const start = Date.now(); Date.now() < start + timeout; ) {
    if (await fn()) {
      return;
    }

    await new Promise(requestAnimationFrame);
  }

  throw new Error(
    `Timed out while waiting for page condition "${message}" after ${
      timeout / 1000
    } seconds.`
  );
}
