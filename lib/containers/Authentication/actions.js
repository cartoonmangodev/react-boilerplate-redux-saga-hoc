"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actionConverter = _interopRequireDefault(require("../../utils/commonReduxSagaConverter/actionConverter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';
var _default = Actions => {
  var {
    componentActions,
    actions,
    sagaActions,
    cancelActions
  } = (0, _actionConverter.default)(Actions);
  return {
    componentActions,
    actions,
    sagaActions,
    cancelActions
  };
};

exports.default = _default;