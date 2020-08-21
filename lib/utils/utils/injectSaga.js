function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';
import getInjectors from './sagaInjectors';
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

export default (function (_ref) {
  var key = _ref.key,
      saga = _ref.saga,
      mode = _ref.mode;
  return function (WrappedComponent) {
    var InjectSaga = /*#__PURE__*/function (_React$Component) {
      _inheritsLoose(InjectSaga, _React$Component);

      var _super = _createSuper(InjectSaga);

      function InjectSaga(props, context) {
        var _this;

        _this = _React$Component.call(this, props, context) || this;
        _this.injectors = getInjectors(context.store);

        _this.injectors.injectSaga(key, {
          saga: saga,
          mode: mode
        }, _this.props);

        return _this;
      }

      var _proto = InjectSaga.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.injectors.ejectSaga(key);
      };

      _proto.render = function render() {
        return React.createElement(WrappedComponent, this.props);
      };

      return InjectSaga;
    }(React.Component);

    _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);

    _defineProperty(InjectSaga, "contextType", ReactReduxContext);

    _defineProperty(InjectSaga, "displayName", "withSaga(" + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ")");

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
});

var useInjectSaga = function useInjectSaga(_ref2) {
  var key = _ref2.key,
      saga = _ref2.saga,
      mode = _ref2.mode;
  var context = React.useContext(ReactReduxContext);
  React.useEffect(function () {
    var injectors = getInjectors(context.store);
    injectors.injectSaga(key, {
      saga: saga,
      mode: mode
    });
    return function () {
      injectors.ejectSaga(key);
    };
  }, []);
};

export { useInjectSaga };