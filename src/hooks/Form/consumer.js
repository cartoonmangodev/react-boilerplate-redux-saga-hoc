import { useContext, memo } from 'react';
import FormContext from './context';

const ID_KEY = 'id';

const Consumer = memo(
  ({ children, ...props }) => {
    return typeof children === 'function' ? children(props) : children;
  },
  (prev, next) => prev.value === next.value && prev.error === next.error,
);

export default ({ children, ...props }) => {
  const { inputProps = {}, idKey, onSubmit } = useContext(FormContext) || {};
  const _props = {
    ...(onSubmit ? { onSubmit } : {}),
    ...(inputProps[props[idKey || ID_KEY]] || {}),
    ...props,
  };
  return <Consumer {..._props}>{children}</Consumer>;
};
