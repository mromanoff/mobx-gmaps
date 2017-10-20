// @flow

const objectToSearchParams = (object: Object): string => {
  return Object.keys(object).map((key): string => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
  }).join('&');
};

export default objectToSearchParams;