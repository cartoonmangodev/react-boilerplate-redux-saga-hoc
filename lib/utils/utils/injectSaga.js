"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInjectSaga = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _reactRedux = require("react-redux");

var _sagaInjectors = _interopRequireDefault(require("./sagaInjectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
var _default = ({
  key,
  saga,
  mode
}) => WrappedComponent => {
  class InjectSaga extends _react.default.Component {
    constructor(props, context) {
      super(props, context);
      this.injectors = (0, _sagaInjectors.default)(context.store);
      this.injectors.injectSaga(key, {
        saga,
        mode
      }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return _react.default.createElement(WrappedComponent, this.props);
    }

  }

  _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);

  _defineProperty(InjectSaga, "contextType", _reactRedux.ReactReduxContext);

  _defineProperty(InjectSaga, "displayName", `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`);

  return (0, _hoistNonReactStatics.default)(InjectSaga, WrappedComponent);
};

exports.default = _default;

const useInjectSaga = ({
  key,
  saga,
  mode
}) => {
  const context = _react.default.useContext(_reactRedux.ReactReduxContext);

  _react.default.useEffect(() => {
    const injectors = (0, _sagaInjectors.default)(context.store);
    injectors.injectSaga(key, {
      saga,
      mode
    });
    return () => {
      injectors.ejectSaga(key);
    };
  }, []);
};

exports.useInjectSaga = useInjectSaga;