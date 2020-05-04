export const formatPriceWithComma = price => {
  let formattedPrice;
  if (price) {
    formattedPrice = new Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 3,
    }).format(price);
    return `INR ${formattedPrice}`;
  }
  return 'INR 0';
};

export const formatPriceWithUnit = value => {
  let val = Math.abs(value);
  if (val >= 10000000) {
    val = `${val / 10000000}`;
    return val <= 1 ? `${val} Crore` : `${val} Crores`;
  }
  if (val >= 100000) {
    val = `${val / 100000}`;
    return val <= 1 ? `${val} Lakh` : `${val} Lakhs`;
  }
  return val;
};

export const formatOrdinalSuffix = value => {
  if (value > 3 && value < 21) return `${value}th`; // thanks kennebec
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};
