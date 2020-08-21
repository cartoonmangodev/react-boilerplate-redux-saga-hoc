export var cloneObject = function cloneObject(oldState, newState) {
  if (newState === void 0) {
    newState = {};
  }

  return Object.assign({}, oldState, newState);
};
export var newObject = function newObject(oldState) {
  if (oldState === void 0) {
    oldState = {};
  }

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.reduce(function (acc, curr) {
    return cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr);
  }, cloneObject(oldState));
};