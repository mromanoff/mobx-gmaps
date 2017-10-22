// @flow

const redirect = (url: string, delay: number = 0): void => {

  window.setTimeout((): void => {
    window.location.assign(url);
  }, delay);

};

export default redirect;