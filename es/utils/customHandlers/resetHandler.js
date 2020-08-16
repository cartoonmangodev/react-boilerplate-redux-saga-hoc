"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayResetHandler = exports.resetHandler = void 0;

var _helpers = require("../helpers");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resetHandler = function resetHandler(state, newState, _ref) {
  var type = _ref.response.type;
  var customType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return (0, _helpers.newObject)(state, function (_ref2) {
    var Data = _ref2[customType || type];
    return _defineProperty({}, customType || type, (0, _helpers.newObject)(Data, function (_ref3) {
      var data = _ref3.data,
          toast = _ref3.toast,
          infiniteEnd = _ref3.infiniteEnd;
      return {
        data: Array.isArray(data) && [] || {},
        toast: (0, _helpers.newObject)(toast, {
          message: '',
          status: ''
        }),
        isError: false,
        statusCode: 200,
        infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
        lastUpdated: (0, _helpers.generateTimeStamp)()
      };
    }));
  });
};

exports.resetHandler = resetHandler;

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayResetHandler = function filterArrayResetHandler(state, newState, action, filter) {
  var customType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var type = action.response.type;
  return (0, _helpers.newObject)(state, function (_ref5) {
    var oldData = _ref5[customType || type];
    return _defineProperty({}, type, (0, _helpers.newObject)(oldData, function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$data = _ref6.data,
          Data = _ref6$data === void 0 ? {} : _ref6$data;

      return {
        data: function () {
          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), function (_data) {
                return _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(_data, function (_ref7) {
                  var data = _ref7.data,
                      toast = _ref7.toast,
                      infiniteEnd = _ref7.infiniteEnd;
                  return {
                    data: Array.isArray(data) && [] || {},
                    toast: (0, _helpers.newObject)(toast, {
                      message: '',
                      status: ''
                    }),
                    isError: false,
                    infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                    lastUpdated: (0, _helpers.generateTimeStamp)()
                  };
                }) : _data;
              });
            }, Data);
          }

          return (0, _helpers.updateIn)(Data, filter, function (updateData) {
            return (0, _helpers.newObject)(updateData, function (_ref8) {
              var data = _ref8.data,
                  toast = _ref8.toast,
                  infiniteEnd = _ref8.infiniteEnd;
              return {
                data: Array.isArray(data) && [] || {},
                toast: (0, _helpers.newObject)(toast, {
                  message: '',
                  status: ''
                }),
                isError: false,
                infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                lastUpdated: (0, _helpers.generateTimeStamp)()
              };
            });
          });
        }()
      };
    }));
  });
};

exports.filterArrayResetHandler = filterArrayResetHandler;