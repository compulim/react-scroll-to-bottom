const createHost = require('./host/index');
const createWebDriver = require('./webDriver/index');

module.exports = function createProxies(driver) {
  return {
    host: createHost(driver),
    webDriver: createWebDriver(driver)
  };
};
