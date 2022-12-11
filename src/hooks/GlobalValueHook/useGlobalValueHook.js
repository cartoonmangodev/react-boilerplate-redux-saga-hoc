import { useState, useEffect, useRef } from 'react';
import { globals as GlobalEmitter } from './globals';

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
  const [values, setValues] = useState(initialValue || GlobalEmitter.value);
  valueRef.current.value = values;
  useEffect(() => {
    GlobalEmitter.subscribe(_value => {
      if (
        key
          ? _value[key] !== valueRef.current.value[key]
          : _value !== valueRef.current.value
      ) {
        setValues(_value);
      }
    });
  });
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
