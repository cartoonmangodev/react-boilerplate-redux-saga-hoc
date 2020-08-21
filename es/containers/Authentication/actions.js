"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actionConverter2 = _interopRequireDefault(require("../../utils/commonReduxSagaConverter/actionConverter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';
var _default = function _default(Actions) {
  var _actionConverter = (0, _actionConverter2.default)(Actions),
      componentActions = _actionConverter.componentActions,
      actions = _actionConverter.actions,
      sagaActions = _actionConverter.sagaActions,
      cancelActions = _actionConverter.cancelActions;

  return {
    componentActions: componentActions,
    actions: actions,
    sagaActions: sagaActions,
    cancelActions: cancelActions
  };
};

exports.default = _default;