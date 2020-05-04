export const convertLength = (value, convertTo) =>
  value
    ? (convertTo === 'inch' ? +value / 2.54 : +value * 2.54).toFixed(2)
    : '';
