export var convertWeight = function convertWeight(value, convertTo) {
  return value ? (convertTo === 'lbs' ? value * 2.205 : value / 2.205).toFixed(2) : '';
};