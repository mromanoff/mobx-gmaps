// @flow

/**
 * Get item from session storage.
 * @function getItem
 * @param {string} key - Retrieve the value of this key.
 * @return {any} Stored key value or undefined if it doesn't exist.
 */
const getItem = (key: string): any => {
  const item = window.sessionStorage.getItem(key);

  if (item === null) {
    //console.warn('LocalStorage: ' + key + ' not found.');
    return undefined;
  } else {
    //console.info('LocalStorage: Loaded ' + key + '.');
    return JSON.parse(item);
  }
};

/**
 * Set item in session storage.
 * @function setItem
 * @param {string} key - Assign value to this key.
 * @param {string|number|array|object} value - Value to be stored.
 */
const setItem = <T>(key: string, value: T): void => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};


const sessionStorage = {
  setItem,
  getItem,
};

export default sessionStorage;