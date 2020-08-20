"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInjectReducer = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _reactRedux = require("react-redux");

var _reducerInjectors = _interopRequireDefault(require("./reducerInjectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
var _default = (_ref, createReducer) => {
  var {
    key,
    reducer
  } = _ref;
  return WrappedComponent => {
    class ReducerInjector extends _react.default.Component {
      constructor(props, context) {
        super(props, context);
        (0, _reducerInjectors.default)(context.store).injectReducer(key, reducer, createReducer);
      }

      render() {
        return _react.default.createElement(WrappedComponent, this.props);
      }

    }

    _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);

    _defineProperty(ReducerInjector, "contextType", _reactRedux.ReactReduxContext);

    _defineProperty(ReducerInjector, "displayName", "withReducer(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return (0, _hoistNonReactStatics.default)(ReducerInjector, WrappedComponent);
  };
};

exports.default = _default;

var useInjectReducer = (_ref2, createReducer) => {
  var {
    key,
    reducer
  } = _ref2;

  var context = _react.default.useContext(_reactRedux.ReactReduxContext);

  _react.default.useEffect(() => {
    (0, _reducerInjectors.default)(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

exports.useInjectReducer = useInjectReducer;