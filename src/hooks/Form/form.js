import React, { useEffect, useState, useRef } from 'react';
import isEqual from 'fast-deep-equal';
import FormContext from './context';

export default ({
  children,
  idKey,
  onSubmit,
  formRef,
  inputProps: _inputProps,
  extraProps,
}) => {
  const ref = useRef(extraProps);
  const [inputProps, setInputProps] = useState(
    () => _inputProps || formRef.getInputProps(extraProps),
  );
  useEffect(() => {
    if (formRef && formRef.formId && !_inputProps)
      formRef.setInputProps = setInputProps;
  }, []);

  const is_equal = isEqual(ref.current, extraProps);

  useEffect(() => {
    if (!is_equal && !_inputProps) {
      ref.current = extraProps;
      setInputProps(formRef.getInputProps(extraProps));
    }
  }, [is_equal]);

  const __inputProps = _inputProps || inputProps;
  return (
    <FormContext.Provider value={{ inputProps: __inputProps, idKey, onSubmit }}>
      {typeof children === 'function' ? children(__inputProps) : children}
    </FormContext.Provider>
  );
};
