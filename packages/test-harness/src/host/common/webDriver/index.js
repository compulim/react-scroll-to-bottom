const click = require("./click");
const performActions = require("./performActions");
const sendDevToolsCommand = require("./sendDevToolsCommand");
const takeScreenshot = require("./takeScreenshot");
const windowSize = require("./windowSize");

/** RPC object on the Jest side. */
module.exports = function createWebDriver(webDriver) {
  // Modifying this map will also requires modifying the corresponding RPC dummy at /src/browser/proxies/webDriver.js
  return {
    click: click(webDriver),
    performActions: performActions(webDriver),
    sendDevToolsCommand: sendDevToolsCommand(webDriver),
    takeScreenshot: takeScreenshot(webDriver),
    windowSize: windowSize(webDriver),
  };
};
