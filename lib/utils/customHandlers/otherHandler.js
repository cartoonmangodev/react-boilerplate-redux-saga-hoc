export var previousDataHandler = function previousDataHandler(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      data = _ref.data;

  return {
    previousData: data
  };
};
export var reducerLogHandler = function reducerLogHandler(old, newData) {
  // eslint-disable-next-line no-console
  console.log('OLD STATE : ', old, '\n', 'NEW STATE : ', newData);
};