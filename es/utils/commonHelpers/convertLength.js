export var convertLength = function convertLength(value, convertTo) {
  return value ? (convertTo === 'inch' ? +value / 2.54 : +value * 2.54).toFixed(2) : '';
};