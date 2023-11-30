import React, { useContext, memo } from 'react';
import FormContext from './context';

const ID_KEY = 'id';

const Consumer = memo(
  ({ children, ...props }) => {
    return typeof children === 'function' ? children(props) : children;
  },
  (prev, next) =>
    prev.value === next.value &&
    prev.error === next.error &&
    prev.lastUpdated === next.lastUpdated,
);

export default ({ children, ...props }) => {
  const { inputProps = {}, idKey, onSubmit } = useContext(FormContext) || {};
  const _inputFieldProps = inputProps[props[idKey || ID_KEY]] || {};
  const _config = _inputFieldProps._config || {};
  const _props = {
    inputProps: _inputFieldProps.inputProps || {},
    _inputFieldConfig: _config,
    ...(onSubmit ? { onSubmit } : {}),
    ...props,
  };
  return <Consumer {..._props}>{children}</Consumer>;
};
