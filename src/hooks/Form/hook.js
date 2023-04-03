import { useContext } from 'react';
import FormContext from './context';

const ID_KEY = 'id';
export default (props) => {
  const { inputProps = {}, idKey } = useContext(FormContext) || {};
  return {
    ...(inputProps[props[idKey || ID_KEY]] || {}),
    ...props,
  };
};
