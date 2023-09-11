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
  const globalRef = useRef({});
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

  globalRef.current.value = key ? values[key] : values;
  globalRef.current.dispatch = GlobalEmitter.dispatch.bind(GlobalEmitter);
  globalRef.current.resetValue = GlobalEmitter.resetValue.bind(GlobalEmitter);
  globalRef.current.clearValue = GlobalEmitter.clearValue.bind(GlobalEmitter);
  globalRef.current.getValue = GlobalEmitter.getValue.bind(GlobalEmitter);
  globalRef.current.setValue = GlobalEmitter.setValue.bind(GlobalEmitter);
  globalRef.current.subscribe = GlobalEmitter.subscribe.bind(GlobalEmitter);
  globalRef.current.GlobalEmitter = GlobalEmitter;

  return {
    ...globalRef.current,
    globalRef: globalRef.current,
  };
}
