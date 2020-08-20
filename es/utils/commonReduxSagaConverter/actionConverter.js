"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonConstants = require("./commonConstants");

var _helpers = require("../helpers");

const ignore = {
  component: [_commonConstants.SUCCESS, _commonConstants.ERROR],
  saga: [_commonConstants.CALL, _commonConstants.CANCEL, _commonConstants.CUSTOM],
  cancel: [_commonConstants.SUCCESS, _commonConstants.ERROR, _commonConstants.CALL, _commonConstants.CUSTOM]
};
const bindKey = [_commonConstants.CANCEL, _commonConstants.CUSTOM];

const actionConverter = (action, actionName, ignoreStatus, type) => Object.entries(action).reduce((acc, [key, value]) => ignoreStatus && ignore[type].includes(key) && acc || (0, _helpers.cloneObject)(acc, {
  [`${actionName}_${key}`]: bindKey.includes(key) && value.bind({}, action[_commonConstants.CALL]().type) || value
}), {});

var _default = action => Object.entries(action).reduce((acc, [key, value]) => ({
  actions: (0, _helpers.cloneObject)(acc.actions, actionConverter(value, key)),
  sagaActions: (0, _helpers.cloneObject)(acc.sagaActions, actionConverter(value, key, true, 'saga')),
  componentActions: (0, _helpers.cloneObject)(acc.componentActions, actionConverter(value, key, true, 'component')),
  cancelActions: (0, _helpers.cloneObject)(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
}), {});

exports.default = _default;