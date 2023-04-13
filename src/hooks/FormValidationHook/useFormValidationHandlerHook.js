/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import { useState, useCallback, useRef } from 'react';
import { newObject, generateTimeStamp, typeOf } from '../../utils/helpers';
import { TYPE_BOOLEAN, TYPE_OBJECT } from '../../constants';
import { ON_CHANGE, ON_BLUR, VALUE, ERROR } from './constants';
import { trimStrings, updateIn } from '../../utils/helpers';
import Safe from '../../utils/nullCheck';

import Validator from './validator';
const getPlatformBasedFieldValue = e =>
  e &&
  typeof e === 'object' &&
  e.target &&
  typeof e.preventDefault === 'function'
    ? e.target.value
    : e;
const getPlatformBasedFieldName = e =>
  e &&
  typeof e === 'object' &&
  e.target &&
  typeof e.preventDefault === 'function'
    ? e.target.name
    : '';

const _setInitialValues = ({ formConfig, initialValues }) =>
  Object.entries(formConfig || {}).reduce(
    (acc, [key, val = {}]) =>
      newObject(acc, {
        [key]:
          typeof initialValues[key] !== 'undefined'
            ? typeof initialValues[key] === 'function'
              ? initialValues[key]()
              : initialValues[key]
            : typeof val.default !== 'undefined'
            ? val.default
            : '',
      }),
    {},
  );
const checkType = (val, oldVal) =>
  newObject(typeof val === 'function' ? val(oldVal) : val);

const useFormValidationHandlerHook = ({
  ON_CHANGE_KEY: _ON_CHANGE_KEY,
  ON_BLUR_KEY: _ON_BLUR_KEY,
  VALUE_KEY: _VALUE_KEY,
  ERROR_KEY: _ERROR_KEY,
  VALIDATOR: _VALIDATOR,
} = {}) => ({
  VALIDATOR: Validate = _VALIDATOR || Validator,
  initialValues = {},
  FORM_CONFIG = {},
  ON_CHANGE_KEY = _ON_CHANGE_KEY || ON_CHANGE,
  ON_BLUR_KEY = _ON_BLUR_KEY || ON_BLUR,
  VALUE_KEY = _VALUE_KEY || VALUE,
  ERROR_KEY = _ERROR_KEY || ERROR,
} = {}) => {
  const formRef = useRef({ is_validate_form_triggered: false });
  const [formConfig, _setFormConfig] = useState(FORM_CONFIG);
  const [errors, _setErrors] = useState({});
  const [values, _setValues] = useState(() =>
    _setInitialValues({ formConfig, initialValues }),
  );

  const setFormConfig = useCallback(_formConfig => {
    formRef.current.formConfig = checkType(
      _formConfig,
      formRef.current.formConfig,
    );
    _setFormConfig(formRef.current.formConfig);
  }, []);
  const setValues = useCallback(_values => {
    formRef.current.values = checkType(_values, formRef.current.values);
    _setValues(formRef.current.values);
  }, []);
  const setErrors = useCallback(_errors => {
    formRef.current.errors = checkType(_errors, formRef.current.errors);
    _setErrors(formRef.current.errors);
  }, []);

  formRef.current.values = values;
  formRef.current.errors = errors;
  formRef.current.formConfig = formConfig;
  formRef.current.setFormConfig = setFormConfig;

  const validateValue = useCallback(
    (__value, key, isSetValue, isSetError, _config, isTrim = false) => {
      formRef.current.lastUpdated = generateTimeStamp();
      const config = _config || formRef.current.formConfig[key] || {};
      // eslint-disable-next-line prefer-const
      let { value, error: validatorError } =
        config && config.validator
          ? config.validator(
              __value,
              formRef.current,
              formRef.current.formConfig[key]._config,
              formRef.current.formConfig[key]._commonInputProps,
            )
          : { value: __value };
      let error = null;
      let maxError = null;
      if (!config._noValidate) {
        if (config.maxLength && (__value || '').length > config.maxLength) {
          maxError =
            typeof (config.message && config.message.maxLength) !== 'undefined'
              ? config.message.maxLength
              : `maximum ${config.maxLength} characters are allowed`;
          value = value.slice(0, config.maxLength);
          // return;
        }
        if (
          typeof config.trim !== 'undefined'
            ? config.trim
            : config.trim || isTrim
        )
          value = trimStrings(value, config.isNumber);
        if (config) {
          error =
            validatorError ||
            Validate(value, config.type, {
              key,
              optional: config.optional,
              minLength: config.minLength,
              message: config.message,
              maxLength: config.maxLength,
              length: config.length,
              ...config,
            }) ||
            maxError;
          if (
            value &&
            config.match &&
            typeof config.match === 'string' &&
            formRef.current.values[config.match]
          )
            error =
              formRef.current.values[config.match] !== value
                ? typeof (config.message && config.message.match) !==
                  'undefined'
                  ? config.message.match
                  : `${key} not matching with ${config.match}`
                : maxError;
        }
        if (key && isSetValue)
          if (
            value !== '' &&
            !Number.isNaN(+value) &&
            !(config.allowValidNumber ? !!+value : true)
          )
            error =
              typeof (config.message && config.message.allowValidNumber) !==
              'undefined'
                ? config.message && config.message.allowValidNumber
                : 'Please enter valid number';
          else if (config.allowOnlyNumber)
            if (!Number.isNaN(+value)) {
              setValues({
                ...formRef.current.values,
                [key]: value,
              });
            } else
              error =
                typeof (config.message && config.message.allowOnlyNumber) !==
                'undefined'
                  ? config.message && config.message.allowOnlyNumber
                  : 'Only numbers are allowed';
          else {
            setValues({
              ...formRef.current.values,
              [key]: value,
            });
          }
      }
      if (typeof config.callback === 'function') {
        const response = config.callback(
          {
            error,
            value,
            key,
            formRef: formRef.current,
            is_validation_allowed: !config._noValidate,
          },
          formRef.current.formConfig[key]._config,
          formRef.current.formConfig[key]._commonInputProps,
        );
        if (typeOf(response) === TYPE_OBJECT) {
          setValues({
            ...formRef.current.values,
            [key]: response.value,
          });
          error = response.error;
        }
      }
      if (!isSetError) return { error, value, key };
      if (key) {
        setErrors({
          ...formRef.current.errors,
          [key]: error || null,
        });
      }
      return { error, value, key };
    },
    [],
  );

  const onChangeValues = useCallback(
    (
      e = {},
      key,
      {
        value: _value,
        isStopPropagation,
        isValidateOnly,
        config,
        isSetError = true,
        trim,
      } = {},
    ) => {
      // formRef.current.isFormChanged = true;
      // formRef.current.lastUpdated = generateTimeStamp();
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      if (e && isStopPropagation && typeof e.stopPropagation === 'function')
        e.stopPropagation();
      const value =
        typeof _value !== 'undefined' ? _value : getPlatformBasedFieldValue(e);
      const _key = getPlatformBasedFieldName(e);
      const KEY = key || _key;
      if (isValidateOnly || !KEY)
        return validateValue(value, KEY, null, null, config, trim);
      validateValue(
        value,
        KEY,
        true,
        isSetError === undefined ? true : isSetError,
        undefined,
        trim,
      );
    },
    [],
  );
  const onValidateValues = useCallback(
    ({ value, isValue, key, isValidateOnly, config, trim }) =>
      onChangeValues(value, key, {
        value: isValue ? value : undefined,
        isValidateOnly,
        config,
        trim,
      }),
    [],
  );
  const onBlurValues = useCallback((e, key, config = {}) => {
    const _key = getPlatformBasedFieldName(e);
    const KEY = key || _key;
    const value = formRef.current.values[KEY];
    if (config.isValidateOnBlur === undefined ? true : config.isValidateOnBlur)
      validateValue(value, KEY, false, true);
  }, []);
  const validateForm = useCallback(
    ({
      isSetError,
      formConfig: __FORM_CONFIG = {},
      values: __values = {},
      errors: __errors = {},
      isNewFormConfig,
      isResetValue,
      isResetError,
    } = {}) => {
      formRef.current.is_validate_form_triggered = true;
      const IS_RESET_VALUE = isResetValue && {};
      const IS_RESET_ERROR = isResetError && {};
      const _FORM_CONFIG = isNewFormConfig
        ? __FORM_CONFIG
        : newObject(formRef.current.formConfig, __FORM_CONFIG);
      const _values = newObject(
        IS_RESET_VALUE || formRef.current.values,
        __values,
      );
      const _errors = newObject(
        IS_RESET_ERROR || formRef.current.errors,
        __errors,
      );
      const isError = [];
      for (const key of Object.keys(_FORM_CONFIG)) {
        const { error: _error } = validateValue(
          _values[key],
          key,
          false,
          false,
          _FORM_CONFIG[key],
          true,
        );
        _errors[key] = _error;
        if (_error) isError.push(null);
      }
      if (isSetError) {
        formRef.current.lastUpdated = generateTimeStamp();
        setErrors(_errors);
      }
      formRef.current.is_validate_form_triggered = false;
      return {
        values: _values,
        error: _errors,
        totalErrorCount: isError.length,
        errorCount: isError.length,
        isError: isError.length > 0,
        isValidatePassed: isError.length === 0,
      };
    },
    [],
  );
  const validateCustomForm = useCallback(
    ({
      isSetError,
      formConfig: form_config = {},
      values: __values = {},
      errors: __errors = {},
    }) => {
      formRef.current.lastUpdated = generateTimeStamp();
      const _FORM_CONFIG = form_config;
      const _values = __values;
      const _errors = __errors;
      const isError = [];
      for (const key of Object.keys(_FORM_CONFIG)) {
        const { error: _error } = validateValue(
          _values[key],
          key,
          false,
          false,
          _FORM_CONFIG[key],
        );
        _errors[key] = _error;
        if (_error) isError.push(null);
      }
      if (isSetError) setErrors(_errors);
      return {
        values: _values,
        errors: _errors,
        totalErrorCount: isError.length,
        errorCount: isError.length,
        isError: isError.length > 0,
        isValidatePassed: isError.length === 0,
      };
    },
    [],
  );
  const onValidateCustomObject = useCallback(
    (value, config) =>
      validateForm({
        isSetError: false,
        values: value,
        formConfig: config,
        isNewFormConfig: true,
        isResetValue: true,
        isResetError: true,
      }),
    [],
  );
  const onAddFormConfig = useCallback((config, isReset, _values = {}) => {
    formRef.current.lastUpdated = generateTimeStamp();
    setFormConfig(newObject(isReset ? {} : formRef.current.formConfig, config));
    const newVal = Object.entries(config || {}).reduce(
      (acc, [key, _config = {}]) =>
        newObject(acc, {
          [key]:
            _values[key] ||
            (typeof initialValues[key] !== 'undefined' &&
              (typeof initialValues[key] === 'function'
                ? initialValues[key]()
                : initialValues[key])) ||
            (!isReset
              ? formRef.current.values[key] || ''
              : typeof _config.default !== 'undefined'
              ? _config.default
              : ''),
        }),
      {},
    );
    if (isReset) {
      setValues(newVal);
      setErrors({});
    } else {
      setValues(newObject(formRef.current.values, newVal));
    }
  }, []);
  const commonInputProps = useCallback(
    (
      key,
      {
        index,
        config,
        propKeyMap: {
          onChange = ON_CHANGE_KEY,
          onBlur = ON_BLUR_KEY,
          value = VALUE_KEY,
          error = ERROR_KEY,
        } = {},
        ...rest
      } = {},
    ) => {
      const INITIAL_FORM_CONFIG = formRef.current.formConfig[key];
      if (INITIAL_FORM_CONFIG)
        INITIAL_FORM_CONFIG._config = {
          index,
          config,
          key,
          ...rest,
        };
      let _commonInputProps = {
        [onChange]: e => {
          onChangeValues(e, key, config);
          const _validateFieldsOnChange =
            (config && config.validateFieldsOnChange) ||
            (INITIAL_FORM_CONFIG && INITIAL_FORM_CONFIG.validateFieldsOnChange);
          if (_validateFieldsOnChange && _validateFieldsOnChange.length > 0) {
            _validateFieldsOnChange.forEach(_key => {
              if (formRef.current.values[_key]) {
                onChangeValues(
                  formRef.current.values[_key],
                  _key,
                  INITIAL_FORM_CONFIG._config,
                );
              }
            });
          }
        },
        [onBlur]: e => onBlurValues(e, key, INITIAL_FORM_CONFIG._config),
        [value]: formRef.current.values[key],
        [error]: formRef.current.errors[key],
        keyName: key,
      };
      _commonInputProps = {
        ..._commonInputProps,
        ...((INITIAL_FORM_CONFIG &&
          (typeof INITIAL_FORM_CONFIG.inputProps === 'function'
            ? INITIAL_FORM_CONFIG.inputProps(
                formRef.current,
                INITIAL_FORM_CONFIG._config,
                {
                  onChange: _commonInputProps[onChange],
                  onBlur: _commonInputProps[onBlur],
                  value: _commonInputProps[value],
                  error: _commonInputProps[error],
                  key,
                },
              )
            : INITIAL_FORM_CONFIG.inputProps)) ||
          {}),
      };
      _commonInputProps._config = {
        ...formRef.current.formConfig[key],
        inputProps: undefined,
        _commonInputProps: undefined,
      };
      if (INITIAL_FORM_CONFIG) {
        INITIAL_FORM_CONFIG._commonInputProps = {
          ..._commonInputProps,
        };
      }
      return _commonInputProps;
    },
    [],
  );
  const setInitialFormData = useCallback(data => {
    formRef.current.lastUpdated = generateTimeStamp();
    const _values = Object.keys(formRef.current.formConfig).reduce(
      (acc, key) =>
        newObject(acc, {
          [key]:
            typeof data[key] !== 'undefined'
              ? data[key] || ''
              : formRef.current.values[key],
        }),
      {},
    );
    setValues(_values);
  }, []);

  const resetForm = useCallback(() => {
    const _values = Object.entries(formConfig || {}).reduce(
      (acc, [key, val = {}]) =>
        newObject(acc, {
          [key]:
            (typeof initialValues[key] !== 'undefined' &&
              (typeof initialValues[key] === 'function'
                ? initialValues[key]()
                : initialValues[key])) ||
            (typeof val.default !== 'undefined' ? val.default : ''),
        }),
      {},
    );
    setValues(_values);
    setErrors({});
  }, []);

  const getValues = useCallback(_response => {
    const _dontConvertKeysToObject =
      typeOf(_response) === TYPE_BOOLEAN && !_response;

    if (typeOf(_response) === TYPE_OBJECT) {
      return Object.entries(formRef.current.formConfig).reduce(
        (acc, [_key, _config = {}]) => ({
          ...acc,
          [_key]: Safe(_response, `.${_config.key || _key}`),
        }),
        {},
      );
    }
    let _value = formRef.current.values[_key];
    _value =
      typeof _config.payloadCallback === 'function'
        ? _config.payloadCallback(_value)
        : _config.isAllowEmpty
        ? _value
        : _value || undefined;

    if (_dontConvertKeysToObject)
      return Object.entries(formRef.current.formConfig).reduce(
        (acc, [_key, _config = {}]) => ({
          ...acc,
          [_config.key || _key]: _value,
        }),
        {},
      );

    return Object.entries(formRef.current.formConfig).reduce(
      (acc, [_key, _config = {}]) =>
        updateIn(acc, (_config.key || _key).split('.'), () => _value),
      {},
    );
  }, []);

  // const setResponseErrors = useCallback(_errors => {
  //   const _keyErrors = Object.entries(formRef.current.formConfig).reduce(
  //     (acc, [_key, _config = {}]) => ({
  //       ...acc,
  //       [_key]: _errors[_config.key || _key],
  //     }),
  //     {},
  //   );
  //   setValues(_keyErrors);
  // }, []);

  const setResponseErrors = useCallback(_errors => {
    const _keyErrors = Object.entries(formRef.current.formConfig).reduce(
      (acc, [_key, _config = {}]) => ({
        ...acc,
        [_key]: Safe(_errors, `.${_config.key || _key}`),
      }),
      {},
    );
    setErrors(_keyErrors);
  }, []);

  const getInputProps = useCallback(
    (extraProps = {}) =>
      Object.keys(formRef.current.formConfig).reduce(
        (prev, key) => ({
          ...prev,
          [key]: commonInputProps(key, extraProps),
        }),
        {},
      ),
    [],
  );

  const setValidate = useCallback((_config = {}) => {
    let __config = { ...formRef.current.formConfig };
    let __errors = { ...formRef.current.errors };
    Object.entries(_config).forEach(([_key, _value]) => {
      __config[_key]._noValidate = !_value;
      if (!_value) __errors[_key] = '';
    });
    setFormConfig(__config);
    setErrors(__errors);
  }, []);

  // const isFormChanged = useCallback(
  //   () => !isEqual(formRef.current.initialLoadValues, formRef.current.values),
  //   [],
  // );

  formRef.current.commonInputProps = commonInputProps;
  formRef.current.setInitialFormData = setInitialFormData;
  // formRef.current.validateForm = validateForm;
  formRef.current.onBlurValues = onBlurValues;
  formRef.current.onChangeValues = onChangeValues;
  formRef.current.onValidateValues = onValidateValues;
  formRef.current.validateForm = validateForm;
  formRef.current.validateObject = onValidateCustomObject;
  formRef.current.addFormConfig = onAddFormConfig;
  formRef.current.modifyFormConfig = onAddFormConfig;
  formRef.current.validateCustomForm = validateCustomForm;
  formRef.current.getValues = getValues;
  formRef.current.getInputProps = getInputProps;
  formRef.current.setResponseErrors = setResponseErrors;
  formRef.current.setKeyErrors = setResponseErrors;
  // formRef.current.lastUpdated = generateTimeStamp();
  formRef.current.setValidate = setValidate;
  formRef.current.setErrors = setErrors;
  formRef.current.resetForm = resetForm;
  formRef.current.setValues = setValues;
  // formRef.current.isFormChanged = isFormChanged;
  return {
    ...formRef.current,
    validateCustomObject: onValidateCustomObject,
    getPlatformBasedFieldValue,
    formRef: formRef.current,
    setInitialFormData,
    commonInputProps,
    onValidateValues,
    onChangeValues,
    onAddFormConfig,
    setFormConfig,
    validateValue,
    onBlurValues,
    validateForm,
    resetForm,
    setValues,
    setErrors,
    errors,
    values,
  };
};
export default useFormValidationHandlerHook;
/* example
  FORM_CONFIG = {
    name: {
      type: 'string',
      optional: true,
      minLength: 4,
      maxLength: 1,
      extraConfig: {
        isNumber: true
      }
    },
  };
*/
/**
 * @Available props <useFormValidationHandlerHook>
 * setInitialFormData
 * commonInputProps
 * onChangeValues
 * onBlurValues
 * validateForm
 * setValues
 * setErrors
 * formRef
 * errors
 * values
 */
/**
  const { formRef } = useFormValidationHandlerHook({
    VALIDATOR: validator // custom validator <optional>
    FORM_CONFIG: FORM_DATA_CONFIG.cab_once,
    initialValues: {
      entry_date: () => new Date(),
      entry_time: () => new Date(),
    },
  });

  formRef.values.<key>
  formRef.errors.<key>
  <input {...commonInputProps(<key>)} />
  const onChange = () => {
    formRef.onChangeValues(<value>, <key>);
  }
  const onBlur = () => {
    formRef.onBlurValues(<value>, <key>);
  }
  onClick={() => {
    formRef.modifyFormConfig(
      FORM_DATA_CONFIG.cab_once,
      true, // Reset and set value
      {
        entry_time: new Date(),
        entry_date: new Date(),
        repeat_days: '',
      }, // INITIAL_VALUE
    );
  }}
  const { values: _values, isError } = formRef.validateForm({
      isSetError: true,
      formConfig: __FORM_CONFIG = {}, // optional
      values: __values = {}, // optional
      errors: __errors = {}, // optional
      isNewFormConfig, // optional <Boolean>
  });
*/
