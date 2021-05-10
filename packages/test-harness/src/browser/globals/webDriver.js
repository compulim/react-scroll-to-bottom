import rpc from '../../common/rpc';
import webDriverPort from './webDriverPort';

const CHAINABLES = [
  'click',
  'contextClick',
  'doubleClick',
  'dragAndDrop',
  'keyDown',
  'keyUp',
  'move',
  'pause',
  'press',
  'release',
  'sendKeys',
  'synchronize'
];

function createActions(proxy) {
  return function actions() {
    const chain = [];
    const target = {};

    CHAINABLES.forEach(name => {
      target[name] = (...args) => {
        chain.push([name, ...args]);

        return target;
      };
    });

    target.perform = () => proxy.performActions(chain);

    return target;
  };
}

export default function () {
  const proxy = rpc(
    'webDriver',
    {
      click: () => {},
      performActions: () => {},
      sendDevToolsCommand: () => {},
      takeScreenshot: () => {},
      windowSize: () => {}
    },
    [window, webDriverPort()]
  );

  return (
    window.webDriver ||
    (window.webDriver = {
      ...proxy,
      actions: createActions(proxy),
      performActions: undefined
    })
  );
}
