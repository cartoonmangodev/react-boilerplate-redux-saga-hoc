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
import getInjectors from './reducerInjectors';
/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

export default (function (_ref, createReducer) {
  var key = _ref.key,
      reducer = _ref.reducer;
  return function (WrappedComponent) {
    var ReducerInjector = /*#__PURE__*/function (_React$Component) {
      _inheritsLoose(ReducerInjector, _React$Component);

      var _super = _createSuper(ReducerInjector);

      function ReducerInjector(props, context) {
        var _this;

        _this = _React$Component.call(this, props, context) || this;
        getInjectors(context.store).injectReducer(key, reducer, createReducer);
        return _this;
      }

      var _proto = ReducerInjector.prototype;

      _proto.render = function render() {
        return React.createElement(WrappedComponent, this.props);
      };

      return ReducerInjector;
    }(React.Component);

    _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);

    _defineProperty(ReducerInjector, "contextType", ReactReduxContext);

    _defineProperty(ReducerInjector, "displayName", "withReducer(" + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ")");

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
});

var useInjectReducer = function useInjectReducer(_ref2, createReducer) {
  var key = _ref2.key,
      reducer = _ref2.reducer;
  var context = React.useContext(ReactReduxContext);
  React.useEffect(function () {
    getInjectors(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

export { useInjectReducer };