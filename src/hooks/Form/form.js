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
  const [inputProps, setInputProps] = useState(
    () => _inputProps || (formRef && formRef.getInputProps(extraProps)),
  );
  useEffect(() => {
    if (formRef && formRef.formId && !_inputProps && !formRef.setInputProps)
      formRef.setInputProps = setInputProps;
    else if (formRef.setInputProps) delete formRef.setInputProps;
  }, [!!_inputProps]);

  if (formRef && formRef.formId) formRef._extraProps = extraProps;

  const __inputProps = _inputProps || inputProps;

  return (
    <FormContext.Provider value={{ inputProps: __inputProps, idKey, onSubmit }}>
      {typeof children === 'function' ? children(__inputProps) : children}
    </FormContext.Provider>
  );
};
