"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayResetHandler = exports.resetHandler = void 0;

var _helpers = require("../helpers");

/* eslint-disable no-nested-ternary */

/* eslint-disable no-underscore-dangle */

/* eslint-disable indent */
const resetHandler = (state, newState, {
  response: {
    type
  }
}, customType = undefined) => (0, _helpers.newObject)(state, ({
  [customType || type]: Data
}) => ({
  [customType || type]: (0, _helpers.newObject)(Data, ({
    data,
    toast,
    infiniteEnd
  }) => ({
    data: Array.isArray(data) && [] || {},
    toast: (0, _helpers.newObject)(toast, {
      message: '',
      status: ''
    }),
    isError: false,
    statusCode: 200,
    infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
    lastUpdated: (0, _helpers.generateTimeStamp)()
  }))
}));

exports.resetHandler = resetHandler;

const _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];

const filterArrayResetHandler = (state, newState, action, filter, customType = undefined) => {
  const {
    response: {
      type
    }
  } = action;
  return (0, _helpers.newObject)(state, ({
    [customType || type]: oldData
  }) => ({
    [type]: (0, _helpers.newObject)(oldData, ({
      data: Data = {}
    } = {}) => ({
      data: (() => {
        if (filter && filter.some(fil => Array.isArray(fil))) {
          return filter.reduce((accumulator, filterArray) => (0, _helpers.updateIn)(accumulator, _CheckFilter(filterArray), _data => _CheckFilter(filterArray).length > 0 ? (0, _helpers.newObject)(_data, ({
            data,
            toast,
            infiniteEnd
          }) => ({
            data: Array.isArray(data) && [] || {},
            toast: (0, _helpers.newObject)(toast, {
              message: '',
              status: ''
            }),
            isError: false,
            infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
            lastUpdated: (0, _helpers.generateTimeStamp)()
          })) : _data), Data);
        }

        return (0, _helpers.updateIn)(Data, filter, updateData => (0, _helpers.newObject)(updateData, ({
          data,
          toast,
          infiniteEnd
        }) => ({
          data: Array.isArray(data) && [] || {},
          toast: (0, _helpers.newObject)(toast, {
            message: '',
            status: ''
          }),
          isError: false,
          infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
          lastUpdated: (0, _helpers.generateTimeStamp)()
        })));
      })()
    }))
  }));
};

exports.filterArrayResetHandler = filterArrayResetHandler;