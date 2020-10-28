/**
 * this method handles form validations
 * @param <object> validationData - date to validate
 * you can validate required field or other types are:
 * type: {
 * * email - validates valid email address
 * * mobile - validates valid mobile no
 * * password - validates valid password from regex - u can change regex in ValidationRegex js
 * * confirm paasword - validates password is matching with confirmPassword or not
 * * string - validates valid string
 * * number - validates valid integer
 * * array - not an empty array
 * }
 * validationData : { <field_key>: { type: <from above types>, value: <value to validate> }}
 */
import * as validate from './Validator';
// import findKey from 'lodash/isEmpty';
/* eslint-disable no-underscore-dangle */

export default function validateForm(validationData) {
  // let value = this[`${type}Ref`].value(),
  const error = { isError: false };
  // eslint-disable-next-line
  Object.entries(validationData).map(([key, formObject]) => {
    const {
      type,
      value,
      message,
      optional = false,
      formatMessage,
      emptyMessage,
      length,
    } = formObject;
    // const isEmpty = validate._isEmpty(validationData[value].value);
    let isEmpty;
    if (!optional || value) {
      if (Array.isArray(value)) {
        isEmpty = !value.length > 0;
      } else {
        isEmpty = validate._isEmpty(value);
      }

      const typeMatch = {};
      if (!isEmpty) {
        // Add more cases depending upon the types that need to be checked
        // eslint-disable-next-line default-case
        switch (type) {
          case 'email':
            typeMatch.hasPassed = validate._isValidEmail(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] =
                message || 'Please enter Valid Email eg. (abc@abc.com)';
            }
            break;
          case 'mobile':
            typeMatch.hasPassed = validate._isValidMobile(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Please enter Valid Mobile Number';
            }
            break;
          case 'password':
            typeMatch.hasPassed = validate._isValidPassword(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] =
                message ||
                'Passwords must contain at least 6 characters to 20 characters';
            }
            break;
          case 'confirmPassword': {
            // eslint-disable-line no-case-declarations
            // const password  = findKey(validationData, { type: 'password' });
            const password = validationData[key].compareValue;
            typeMatch.hasPassed = validate._isMatching(password, value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] =
                message || 'Password & Confirm password do not match';
            }
            break;
          }
          case 'string':
            typeMatch.hasPassed = validate._isValidString(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Invalid format';
            }
            break;
          case 'name':
            typeMatch.hasPassed = validate._isValidName(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = formatMessage || 'Invalid format';
            }
            if (
              validationData[value] &&
              value.length < (length === 0 ? length : 3)
            ) {
              error[`${key}`] =
                message || 'Name Must Be Greater Than 2 Characters';
            }
            break;
          case 'number':
            typeMatch.hasPassed = validate._isValidNumber(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Invalid format';
            }
            break;
          case 'float':
            typeMatch.hasPassed = validate._isValidFloatNumber(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Invalid format';
            }
            break;
          case 'postiveIntegerReg':
            typeMatch.hasPassed = validate._isPostiveInteger(value);
            if (!typeMatch.hasPassed) {
              error[`${key}`] = message || 'Enter a valid input';
            }
            break;
          case 'array':
            typeMatch.hasPassed = validate._isValidArray(value);
            if (typeMatch.hasPassed) {
              error[`${key}`] = message || 'Please upload Images';
            }
            break;
          case 'textarea':
            typeMatch.hasPassed = validate._isValidTextAreaInput(value);
            if (typeMatch.hasPassed) {
              error[`${key}`] =
                message || 'Description should be of mininum 5 characters';
            }
            break;
          case 'dateString':
            typeMatch.hasPassed = validate._isValidTextAreaInput(value);
            if (typeMatch.hasPassed) {
              error[`${key}`] =
                message || 'Description should be of mininum 5 characters';
            }
            break;
        }
      } else {
        error[key] =
          validationData[key].type === 'mobile'
            ? emptyMessage || 'Please enter Valid Mobile Number'
            : emptyMessage || 'Please provide the necessary details';
      }
    }
  });
  if (Object.keys(error).length > 1) {
    error.isError = true;
  }
  return error;
}
