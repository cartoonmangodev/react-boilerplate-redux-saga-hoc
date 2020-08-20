/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */
import { updateIn, newObject, generateTimeStamp } from '../helpers';
export var resetHandler = function resetHandler(state, newState, _ref, customType) {
  var type = _ref.response.type;

  if (customType === void 0) {
    customType = undefined;
  }

  return newObject(state, function (_ref2) {
    var _ref4;

    var Data = _ref2[customType || type];
    return _ref4 = {}, _ref4[customType || type] = newObject(Data, function (_ref3) {
      var data = _ref3.data,
          toast = _ref3.toast,
          infiniteEnd = _ref3.infiniteEnd;
      return {
        data: Array.isArray(data) && [] || {},
        toast: newObject(toast, {
          message: '',
          status: ''
        }),
        isError: false,
        statusCode: 200,
        infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
        lastUpdated: generateTimeStamp()
      };
    }), _ref4;
  });
};

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

export var filterArrayResetHandler = function filterArrayResetHandler(state, newState, action, filter, customType) {
  if (customType === void 0) {
    customType = undefined;
  }

  var type = action.response.type;
  return newObject(state, function (_ref5) {
    var _ref9;

    var oldData = _ref5[customType || type];
    return _ref9 = {}, _ref9[type] = newObject(oldData, function (_temp) {
      var _ref6 = _temp === void 0 ? {} : _temp,
          _ref6$data = _ref6.data,
          Data = _ref6$data === void 0 ? {} : _ref6$data;

      return {
        data: function () {
          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter(filterArray), function (_data) {
                return _CheckFilter(filterArray).length > 0 ? newObject(_data, function (_ref7) {
                  var data = _ref7.data,
                      toast = _ref7.toast,
                      infiniteEnd = _ref7.infiniteEnd;
                  return {
                    data: Array.isArray(data) && [] || {},
                    toast: newObject(toast, {
                      message: '',
                      status: ''
                    }),
                    isError: false,
                    infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                    lastUpdated: generateTimeStamp()
                  };
                }) : _data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (updateData) {
            return newObject(updateData, function (_ref8) {
              var data = _ref8.data,
                  toast = _ref8.toast,
                  infiniteEnd = _ref8.infiniteEnd;
              return {
                data: Array.isArray(data) && [] || {},
                toast: newObject(toast, {
                  message: '',
                  status: ''
                }),
                isError: false,
                infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                lastUpdated: generateTimeStamp()
              };
            });
          });
        }()
      };
    }), _ref9;
  });
};