// In dev mode, we output the screenshot in console, instead of checking against a PNG file.

module.exports = webDriver =>
  async function snapshot() {
    const base64 = await webDriver.takeScreenshot();

    await webDriver.executeScript(
      /* istanbul ignore next */
      (message, url) => {
        console.groupCollapsed(message);
        console.log(url);
        console.groupEnd();
      },
      '[TESTHARNESS] Snapshot taken.',
      `data:image/png;base64,${base64}`
    );
  };
