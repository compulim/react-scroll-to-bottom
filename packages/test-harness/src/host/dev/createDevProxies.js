const createProxies = require('../common/createProxies');
const done = require('./hostOverrides/done');
const error = require('./hostOverrides/error');
const snapshot = require('./hostOverrides/snapshot');
const windowSize = require('./webDriverOverrides/windowSize');

module.exports = function createDevProxies(driver) {
  const { host, webDriver, ...proxies } = createProxies(driver);

  return {
    host: {
      ...host,
      done: done(driver, host.done),
      error: error(driver, host.error),
      snapshot: snapshot(driver, host.snapshot)
    },
    webDriver: {
      ...webDriver,
      windowSize: windowSize(driver, host.windowSize)
    },
    ...proxies
  };
};
