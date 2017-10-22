// @flow

/**
 * Get item from local storage.
 * @function getItem
 * @param {string} key - Retrieve the value of this key.
 * @return {any} Stored key value or undefined if it doesn't exist.
 */
const getItem = (key: string): ?Object => {
  const item: any = window.localStorage.getItem(key);

  if (item === null) {
    //console.warn('LocalStorage: ' + key + ' not found.');
    return undefined;
  } else {
    //console.info('LocalStorage: Loaded ' + key + '.');
    return JSON.parse(item);
  }
};

/**
 * Set item in local storage.
 * @function setItem
 * @param {string} key - Assign value to this key.
 * @param {string|number|array|object} value - Value to be stored.
 */
const setItem = (key: string, value: Object): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const sessionStorage = {
  setItem,
  getItem,
};

export default sessionStorage;