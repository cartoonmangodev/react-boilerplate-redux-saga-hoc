export var passwordReg = new RegExp(/^.{6,16}$/);
export var emailReg = new RegExp('^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$');
export var mobileReg = new RegExp(/^\d{10,10}$/);
export var nameReg = new RegExp('^[a-zA-Z ]+$');
export var stringReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
export var numberReg = new RegExp('^[\\d]+$');
export var decimalReg = new RegExp('^[+-]?([0-9]*[.])?[0-9]+');
export var postiveIntegerReg = new RegExp('^([1-9][0-9]+|[0-9])$');