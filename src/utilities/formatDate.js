// @flow

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const formatDate = (date: string): string => {

  if (date === '') {
    return '';
  }

  return window.Intl.DateTimeFormat('en-US',
    options).format(Date.parse(date),
  );
};

export default formatDate;
