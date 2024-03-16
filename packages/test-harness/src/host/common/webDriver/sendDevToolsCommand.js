module.exports = function sendDevToolsCommand(webDriver) {
  return (command, parameters) =>
    webDriver.sendDevToolsCommand(command, parameters);
};
