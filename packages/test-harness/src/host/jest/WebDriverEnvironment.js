require('global-agent/bootstrap');

const { join } = require('path');
const NodeEnvironment = require('jest-environment-node');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);

    // Copying normalized options to global, so it can read by `runHTML`.
    this.global.__webDriverEnvironmentOptions__ = {
      testURL: 'http://localhost:5000/',
      webDriverURL: 'http://localhost:4444/wd/hub/',
      ...config.testEnvironmentOptions
    };

    config.setupFilesAfterEnv.push(join(__dirname, 'runHTML.js'), join(__dirname, 'setupToMatchImageSnapshot.js'));
  }
}

module.exports = WebDriverEnvironment;
