import React from 'react';
import FormContext from './context';
export default ({ children, inputProps, idKey }) => (
  <FormContext.Provider value={{ inputProps, idKey }}>
    {children}
  </FormContext.Provider>
);
