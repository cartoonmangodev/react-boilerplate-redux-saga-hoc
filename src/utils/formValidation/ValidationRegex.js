export const passwordReg = new RegExp(/^.{6,16}$/);
export const emailReg = new RegExp(
  '^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$',
);
export const mobileReg = new RegExp(/^\d{10,10}$/);
export const nameReg = new RegExp('^[a-zA-Z ]+$');
export const stringReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
export const numberReg = new RegExp('^[\\d]+$');
export const decimalReg = new RegExp('^[+-]?([0-9]*[.])?[0-9]+');
export const postiveIntegerReg = new RegExp('^([1-9][0-9]+|[0-9])$');

export const regex = {
  password: passwordReg,
  email: emailReg,
  mobile: mobileReg,
  name: nameReg,
  string: stringReg,
  number: numberReg,
  float: decimalReg,
  postiveIntegerReg,
};
