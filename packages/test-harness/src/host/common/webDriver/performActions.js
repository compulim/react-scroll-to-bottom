module.exports = function createPerformActions(webDriver) {
  return async function performActions(chain) {
    let actions = webDriver.actions();

    chain.forEach(([name, ...args]) => {
      if (name !== '__proto__' && name !== 'constructor' && name !== 'prototype') {
        actions = actions[name](...args);
      }
    });

    return await actions.perform();
  };
};
