'use client';

import { useContext } from 'react';
import FormContext from './context';

const ID_KEY = 'id';
export default (props = {}) => {
  const { inputProps = {}, idKey, onSubmit } = useContext(FormContext) || {};
  return {
    ...(onSubmit ? { onSubmit } : {}),
    ...(inputProps[props[idKey || ID_KEY]] || {}),
    ...props,
  };
};
