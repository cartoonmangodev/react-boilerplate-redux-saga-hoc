function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable indent */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-nested-ternary */
import { updateIn, newObject, generateTimeStamp } from '../helpers';

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

export var commonFilterHandler = function commonFilterHandler(customHandler) {
  return function (_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? [] : _ref$filter,
        successDataStatusCode = _ref.successDataStatusCode,
        rest = _objectWithoutPropertiesLoose(_ref, ["filter", "successDataStatusCode"]);

    return function (_ref2) {
      var _ref2$data = _ref2.data,
          Data = _ref2$data === void 0 ? {} : _ref2$data,
          statusCode = _ref2.statusCode;
      return {
        data: function () {
          var paramKey = _extends({
            filter: filter
          }, rest);

          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
                return _CheckFilter(filterArray).length > 0 ? newObject(data, customHandler(paramKey)) : data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (data) {
            return newObject(_extends({}, data, {
              statusCode: successDataStatusCode || statusCode,
              lastUpdated: generateTimeStamp(),
              error: false,
              isError: false
            }), customHandler(paramKey));
          });
        }()
      };
    };
  };
};
/** for Future reference */
// export const filterArrayCustomHandler = ({
//   isInfinite,
//   successData,
//   clearData,
//   query,
//   filter,
//   customHandler,
//   ...rest
// } = {}) => ({ data: Data = {} }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(
//       oldData,
//       customHandler({ isInfinite, successData, query, clearData, ...rest }),
//     ),
//   ),
// });