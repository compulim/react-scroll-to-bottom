const createDeferred = require('p-defer');

const done = require('./done');
const error = require('./error');
const getLogs = require('./getLogs');
const ready = require('./ready');
const snapshot = require('./snapshot');

/** RPC object on the Jest side. */
module.exports = function createHost(webDriver) {
  const doneDeferred = createDeferred();
  const readyDeferred = createDeferred();

  // Modifying this map will also requires modifying the corresponding RPC dummy at /src/browser/proxies/host.js
  return {
    done: done(webDriver, doneDeferred.resolve),
    donePromise: doneDeferred.promise,
    error: error(doneDeferred.reject),
    getLogs: getLogs(webDriver),
    ready: ready(readyDeferred.resolve),
    readyPromise: readyDeferred.promise,
    snapshot: snapshot(webDriver),
  };
};
