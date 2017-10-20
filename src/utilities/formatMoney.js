// @flow

const options = {
  style: 'decimal',
  minimumFractionDigits: 2
};

const formatMoney = (value: number): string => {
  return window.Intl.NumberFormat('en-US', options).format(value);
};

export default formatMoney;
