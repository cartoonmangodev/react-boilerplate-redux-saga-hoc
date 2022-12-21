import { useState, useEffect, useRef } from 'react';
import GlobalEmitter from './globals';

/** example
 * const {
 *  value,
 *  dispatch,
 *  clearValue,
 *  resetValue,
 *  getValue,
 *  setValue,
 * } = useGlobalValueHook(key<optional>,initialState<optional>);
 * console.log(value);
 * dispatch(key,value);
 * clearValue();
 * resetValue(val<optional>);
 * getValue(key<optional>);
 * setValue(key,value)
 */

export default function useGlobalValueHook(key, initialValue) {
  const valueRef = useRef({ initial: true });
  if (
    initialValue &&
    typeof initialValue === 'object' &&
    valueRef.current.initial
  ) {
    GlobalEmitter.resetValue(initialValue);
  }
  valueRef.current.initial = false;
  valueRef.current.key = key;
  const [values, setValues] = useState(initialValue || GlobalEmitter.value);
  valueRef.current.value = values;
  useEffect(() => {
    if (valueRef.current.key !== null)
      GlobalEmitter.subscribe(_value => {
        if (
          key
            ? _value[key] !== valueRef.current.value[key]
            : _value !== valueRef.current.value
        ) {
          setValues(_value);
        }
      });
  }, []);
  return {
    value: key ? values[key] : values,
    dispatch: GlobalEmitter.dispatch.bind(GlobalEmitter),
    resetValue: GlobalEmitter.resetValue.bind(GlobalEmitter),
    clearValue: GlobalEmitter.clearValue.bind(GlobalEmitter),
    getValue: GlobalEmitter.getValue.bind(GlobalEmitter),
    setValue: GlobalEmitter.setValue.bind(GlobalEmitter),
    GlobalEmitter,
  };
}
