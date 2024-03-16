module.exports = function createWindowSize(webDriver) {
  return async function windowSize(nextWidth, nextHeight) {
    const window = webDriver.manage().window();
    const { height, width } = await window.getRect();

    await window.setRect({
      height: nextHeight || height,
      width: nextWidth || width,
    });
  };
};
