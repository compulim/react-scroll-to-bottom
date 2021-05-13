module.exports = function createTakeScreenshot(webDriver) {
  return () => webDriver.takeScreenshot();
};
