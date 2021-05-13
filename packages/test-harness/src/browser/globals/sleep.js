import sleep from '../../common/utils/sleep';

export default function () {
  return window.sleep || (window.sleep = sleep);
}
