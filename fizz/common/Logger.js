import Constants from './Constants';

export function debugLog() {
  // if (!Constants.DEBUG) {
  //   return;
  // }
  // eslint-disable-next-line no-console,prefer-rest-params
  console.log(...arguments);
}
