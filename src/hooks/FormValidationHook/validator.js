import { validateEmail } from '../../../utils/utilFunctions';

function validate(
  value,
  fieldName,
  {
    optional: isOptional,
    minLength,
    isRequired,
    message = {},
    length,
    regex,
    key,
  } = {},
) {
  if ((isOptional || !isRequired) && !value) return '';
  if (value && minLength && value.length < minLength)
    return message && typeof message.minLength !== 'undefined'
      ? message.minLength
      : `Minimum ${minLength} characters is required`;
  if (value && length && value.length !== length)
    return message && message && typeof message.length !== 'undefined'
      ? message.length
      : `Number should be ${length} digits long`;
  switch (fieldName) {
    case 'password': {
      if (!value) {
        return message && typeof message.required !== 'undefined'
          ? message.required
          : 'This field is required';
      }
      return '';
    }
    case 'email': {
      if (!value)
        return message && typeof message.required !== 'undefined'
          ? message.required
          : 'Please enter your email';
      if (value && !validateEmail(value))
        return message && typeof message.invalid !== 'undefined'
          ? message.invalid
          : 'Invalid email address';
      return '';
    }
    case 'name': {
      if (!value)
        return message && typeof message.required !== 'undefined'
          ? message.required
          : 'Please enter your name';
      // if (value && !validateEmail(value)) return 'Invalid email address';
      return '';
    }
    case 'mobileNumber': {
      if (!value)
        return message && typeof message.required !== 'undefined'
          ? message.required
          : 'Please enter 10 digit mobile number';
      return '';
    }
    case 'about': {
      if (!value)
        return message && typeof message.required !== 'undefined'
          ? message.required
          : 'This field is required';
      // if (value && !validateEmail(value)) return 'Invalid email address';
      return '';
    }
    default:
      if (!value) {
        return message && typeof message.required !== 'undefined'
          ? message.required
          : 'This field is required';
      }
      if (regex) {
        if (Object.prototype.toString.call(regex) === '[object RegExp]') {
          if (regex.test(value)) return '';
          return message && typeof message.regex !== 'undefined'
            ? message.regex
            : `${key} is invalid `;
        }
        console.error(`${key} is invalid `);
      }

      return '';
  }
}

export default validate;
