/* eslint-disable no-underscore-dangle */
import { useCallback, useState, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { newObject, typeOf } from '../../utils/helpers';

const checkType = (val, oldVal) =>
  newObject(typeof val === 'function' ? val(oldVal) : val);

const useMultipleOptionsHook = (initialValue = {}) => {
  const [options, _setOptions] = useState(initialValue);
  const ref = useRef({});
  ref.current.options = options;

  const setOptions = useCallback(_values => {
    ref.current.options = checkType(_values, ref.current.options);
    _setOptions(ref.current.options);
  }, []);

  const onChangeOptions = useCallback((key, index, value, error) => {
    if (typeOf(key) === 'object') {
      const { key: _key, index: _index, value: _value, error: _error } = key;
      setOptions(_val => {
        const ___val = { ..._val };
        const __val = ___val[_key].slice();
        __val[_index].value = _value;
        __val[_index].error = _error;
        ___val[_key] = __val;
        return ___val;
      });
    } else
      setOptions(_val => {
        const ___val = { ..._val };
        const __val = ___val[key].slice();
        __val[index].value = value;
        __val[index].error = error;
        ___val[key] = __val;
        return ___val;
      });
  }, []);

  const onDeleteOptions = useCallback((key, i, count = 1) => {
    setOptions(_val => {
      const ___val = { ..._val };
      const __val = ___val[key].slice();
      if (__val.length > 1) __val.splice(i, count);
      ___val[key] = __val;
      return ___val;
    });
  }, []);

  const onDeleteMultipleOptions = useCallback((key, indexes = []) => {
    setOptions(_val => {
      const ___val = { ..._val };
      const __val = ___val[key].slice();
      __val[key] = __val.filter((_, i) => !indexes.includes(i));
      ___val[key] = __val;
      return __val;
    });
  }, []);

  const onGetValues = useCallback(
    key => ref.current.options[key].map(e => e.value),
    [],
  );

  const findRecursiveError = useCallback(
    obj =>
      Object.values(obj).some(e =>
        typeOf(e) === 'object' ? findRecursiveError(e) : e,
      ),
    [],
  );

  const onValidateValues = useCallback((key, callback, isSetError) => {
    if (Array.isArray(key)) {
      const ___val = cloneDeep(ref.current.options);
      let isError = false;
      const returnObj = key.map((_key, index) => {
        if (Array.isArray(___val[_key])) {
          const validatedValue = ___val[_key].map((e, i) =>
            callback(e.value, i, _key),
          );
          const error = validatedValue.map(e => e.error);
          const value = validatedValue.map(e => e.value);
          ___val[_key] = validatedValue;
          if (isSetError && index === key.length - 1) {
            setOptions(___val);
          }

          const errorLength = error.filter(e =>
            typeOf(e) === 'object' ? findRecursiveError(e) : e,
          ).length;
          if (errorLength > 0) isError = true;
          return {
            key: _key,
            error,
            value,
            isError,
          };
        }
        return { key };
      });
      return {
        isError,
        formArray: returnObj,
        formObj: returnObj.reduce(
          (acc, curr) => ({ ...acc, [curr.key]: curr }),
          {},
        ),
      };
    }
    const ___val = { ...ref.current.options };
    const validatedValue = ___val[key].map((e, i) => callback(e.value, i));
    const error = validatedValue.map(e => e.error);
    const value = validatedValue.map(e => e.value);
    if (isSetError) {
      ___val[key] = validatedValue;
      setOptions(___val);
    }
    const errorLength = error.filter(e =>
      typeOf(e) === 'object' ? findRecursiveError(e) : e,
    ).length;
    return {
      error,
      value,
      isError: errorLength > 0,
      errorCount: errorLength,
    };
  }, []);

  const onAddOptions = useCallback((key, value, index, count = 1) => {
    setOptions(_val => {
      const ___val = { ..._val };
      let __val = ___val[key].slice();
      if (typeof index === 'number') {
        __val.splice(
          index,
          0,
          ...Array(count)
            .fill(null)
            .map(() => value || {}),
        );
      } else if (count > 1)
        __val = __val.concat(
          Array(count)
            .fill(null)
            .map(() => value || {}),
        );
      else __val.push(value || {});
      ___val[key] = __val;
      return ___val;
    });
  }, []);

  const onChangeOrderForm = useCallback((key, currentIndex, index) => {
    setOptions(_val => {
      const ___val = { ..._val };
      const __val = ___val[key].slice();
      const __value = __val[currentIndex];
      if (typeof index === 'number' && typeof currentIndex === 'number') {
        __val.splice(currentIndex, 1);
        __val.splice(index, 0, __value);
        ___val[key] = __val;
      }
      return ___val;
    });
  }, []);

  const onResetForm = useCallback(resetValue => {
    if (resetValue) setOptions(() => newObject({}, resetValue));
  }, []);

  const onResetValue = useCallback(resetValue => {
    if (resetValue) setOptions(_options => newObject(_options, resetValue));
    else setOptions(initialValue);
  }, []);

  const onAddForm = useCallback(value => {
    if (value) setOptions(_options => newObject(_options, value));
  }, []);

  const onDeleteMultipleForm = useCallback((deleteKey = []) => {
    if (deleteKey.length > 0)
      setOptions(_options => {
        const __options = { ..._options };
        deleteKey.forEach(key => {
          delete __options[key];
        });
        return __options;
      });
  }, []);

  const onDeleteForm = useCallback((deleteKey = '') => {
    setOptions(_options => {
      const __options = { ..._options };
      delete __options[deleteKey];
      return __options;
    });
  }, []);

  ref.current.changeValue = onChangeOptions;
  ref.current.delete = onDeleteOptions;
  ref.current.getValues = onGetValues;
  ref.current.add = onAddOptions;
  ref.current.value = options;
  ref.current.formValue = options;
  ref.current.validate = onValidateValues;
  ref.current.setValue = setOptions;
  ref.current.deleteMultiple = onDeleteMultipleOptions;
  ref.current.deleteMultipleForm = onDeleteMultipleForm;
  ref.current.resetValue = onResetValue;
  ref.current.resetForm = onResetForm;
  ref.current.addForm = onAddForm;
  ref.current.deleteForm = onDeleteForm;
  ref.current.changeOrder = onChangeOrderForm;

  return {
    deleteMultipleForm: onDeleteMultipleForm,
    deleteMultiple: onDeleteMultipleOptions,
    delete: onDeleteOptions,
    changeValue: onChangeOptions,
    add: onAddOptions,
    value: options,
    formValue: options,
    setValue: setOptions,
    getValues: onGetValues,
    validate: onValidateValues,
    resetForm: onResetForm,
    formRef: ref.current,
    resetValue: onResetValue,
    addForm: onAddForm,
    deleteForm: onDeleteForm,
    changeOrder: onChangeOrderForm,
  };
};
export default useMultipleOptionsHook;
