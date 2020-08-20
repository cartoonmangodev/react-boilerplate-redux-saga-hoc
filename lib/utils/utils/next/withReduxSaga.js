function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _empty() {}

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(_empty);
  }
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { END } from 'redux-saga';

function withReduxSaga(BaseComponent) {
  var WrappedComponent = /*#__PURE__*/function (_Component) {
    _inheritsLoose(WrappedComponent, _Component);

    var _super = _createSuper(WrappedComponent);

    function WrappedComponent() {
      return _Component.apply(this, arguments) || this;
    }

    WrappedComponent.getInitialProps = function getInitialProps(props) {
      try {
        var _ref = props.ctx || props,
            isServer = _ref.isServer,
            store = _ref.store;

        var pageProps = {};
        return _invoke(function () {
          if (BaseComponent.getInitialProps) {
            return _await(BaseComponent.getInitialProps(props), function (_BaseComponent$getIni) {
              pageProps = _BaseComponent$getIni;
            });
          }
        }, function () {
          // Stop saga on the server
          return _invoke(function () {
            if (isServer) {
              store.dispatch(END);
              return _invokeIgnored(function () {
                if (store.sagaTask.toPromise) return _awaitIgnored(store.sagaTask.toPromise());else return _awaitIgnored(store.sagaTask.done);
              });
            }
          }, function () {
            return pageProps;
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    var _proto = WrappedComponent.prototype;

    _proto.render = function render() {
      return React.createElement(BaseComponent, this.props);
    };

    return WrappedComponent;
  }(Component);

  _defineProperty(WrappedComponent, "displayName", "withReduxSaga(" + (BaseComponent.displayName || BaseComponent.name || 'BaseComponent') + ")");

  return WrappedComponent;
}

export default withReduxSaga;