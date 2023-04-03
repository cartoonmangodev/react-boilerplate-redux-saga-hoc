import React from 'react';
import FormContext from './context';
export default ({ children, inputProps, idKey, onSubmit }) => (
  <FormContext.Provider value={{ inputProps, idKey, onSubmit }}>
    {children}
  </FormContext.Provider>
);
