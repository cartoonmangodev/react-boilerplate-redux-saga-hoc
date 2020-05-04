export const convertWeight = (value, convertTo) =>
  value ? (convertTo === 'lbs' ? value * 2.205 : value / 2.205).toFixed(2) : '';
