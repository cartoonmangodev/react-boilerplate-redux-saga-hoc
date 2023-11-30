import React, { useEffect, useState } from 'react';
import FormContext from './context';
export default ({
  children,
  idKey,
  onSubmit,
  formRef,
  inputProps: _inputProps,
}) => {
  const [inputProps, setInputProps] = useState(
    () => _inputProps || formRef.getInputProps(),
  );
  useEffect(() => {
    if (formRef && formRef.formId) formRef.setInputProps = setInputProps;
  }, []);
  const __inputProps = _inputProps || inputProps;
  return (
    <FormContext.Provider value={{ inputProps: __inputProps, idKey, onSubmit }}>
      {typeof children === 'function' ? children(__inputProps) : children}
    </FormContext.Provider>
  );
};
