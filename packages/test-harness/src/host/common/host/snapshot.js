const sleep = require("../../../common/utils/sleep");

const TIME_FOR_IMAGE_COMPLETE = 5000;

module.exports = (webDriver) =>
  async function snapshot(options) {
    // Wait until all images are loaded/errored.
    for (
      const start = Date.now();
      Date.now() - start < TIME_FOR_IMAGE_COMPLETE;

    ) {
      if (
        await webDriver.executeScript(
          /* istanbul ignore next */
          () =>
            [].every.call(
              document.getElementsByTagName("img"),
              ({ complete }) => complete
            )
        )
      ) {
        break;
      }

      sleep(100);
    }

    // TODO: Should we take multiple screenshot and wait until it stabilized before matching image snapshots?
    await expect(webDriver.takeScreenshot()).resolves.toMatchImageSnapshot(
      options
    );
  };
