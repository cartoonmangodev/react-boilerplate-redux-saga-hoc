"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayResetHandler = exports.resetHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */
var resetHandler = function resetHandler(state, newState, _ref) {
  var {
    response: {
      type
    }
  } = _ref;
  var customType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return (0, _helpers.newObject)(state, (_ref2) => {
    var {
      [customType || type]: Data
    } = _ref2;
    return {
      [customType || type]: (0, _helpers.newObject)(Data, (_ref3) => {
        var {
          data,
          toast,
          infiniteEnd
        } = _ref3;
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
      })
    };
  });
};

exports.resetHandler = resetHandler;

var _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

var filterArrayResetHandler = function filterArrayResetHandler(state, newState, action, filter) {
  var customType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var {
    response: {
      type
    }
  } = action;
  return (0, _helpers.newObject)(state, (_ref4) => {
    var {
      [customType || type]: oldData
    } = _ref4;
    return {
      [type]: (0, _helpers.newObject)(oldData, function () {
        var {
          data: Data = {}
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return {
          data: (() => {
            if (filter && filter.some(fil => Array.isArray(fil))) {
              return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), _data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(_data, (_ref5) => {
                var {
                  data,
                  toast,
                  infiniteEnd
                } = _ref5;
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
              }) : _data), Data);
            }

            return (0, _helpers.updateIn)(Data, filter, updateData => (0, _helpers.newObject)(updateData, (_ref6) => {
              var {
                data,
                toast,
                infiniteEnd
              } = _ref6;
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
            }));
          })()
        };
      })
    };
  });
};

exports.filterArrayResetHandler = filterArrayResetHandler;