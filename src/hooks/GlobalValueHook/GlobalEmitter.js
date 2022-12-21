/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');
const isEqual = require('lodash.isequal');
const valueSymbol = Symbol('valueSymbol');
const previousValueSymbol = Symbol('previousValueSymbol');
const globalKeySymbol = Symbol('globalKeySymbol');
const GLOBAL_KEY = '@@GLOBAL_LISTENER@@';
const GLOBAL_RESET = '@@GLOBAL_RESET@@';
class Global extends EventEmitter {
  constructor(value = {}) {
    super();
    this[globalKeySymbol] = GLOBAL_KEY;
    this[valueSymbol] = value;
    this[previousValueSymbol] = value;
  }

  emitGlobal(_key, _val) {
    this.emit(this[globalKeySymbol], this[valueSymbol], {
      key: _key,
      value: _val,
    });
  }

  emitIndividual(_key, _val) {
    this.emit(_key, this[valueSymbol], { key: _key, value: _val });
  }

  resetValue(_val) {
    this[previousValueSymbol] = this[valueSymbol];
    this[valueSymbol] = _val;
    this.emitGlobal(GLOBAL_RESET, this[valueSymbol]);
  }

  clearValue() {
    this[valueSymbol] = {};
    this.emitGlobal(GLOBAL_RESET, this[valueSymbol]);
  }

  getValue(_key) {
    return _key ? this[valueSymbol][_key] : this[valueSymbol];
  }

  setValue(_key, _val) {
    this[previousValueSymbol] = this[valueSymbol];
    const _value = { ...this[valueSymbol] };
    _value[_key] = _val;
    this[valueSymbol] = _value;
    this.emitGlobal(_key, _val);
  }

  get value() {
    return this[valueSymbol];
  }

  get GLOBAL_KEY() {
    return this[globalKeySymbol];
  }

  dispatch(_key, _val) {
    this[previousValueSymbol] = this[valueSymbol];
    const _value = { ...this[valueSymbol] };
    _value[_key] = _val;
    this[valueSymbol] = _value;
    this.emitIndividual(_key, _val);
    this.emitGlobal(_key, _val);
  }

  subscribe(callback) {
    this.on(this[globalKeySymbol], (value, obj) => {
      if (!isEqual(this[previousValueSymbol], this[valueSymbol]))
        callback(value, obj);
    });
  }
}

export default Global;
