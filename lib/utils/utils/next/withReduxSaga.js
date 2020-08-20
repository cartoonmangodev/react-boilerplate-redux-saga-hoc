"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reduxSaga = require("redux-saga");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withReduxSaga(BaseComponent) {
  class WrappedComponent extends _react.Component {
    static async getInitialProps(props) {
      const {
        isServer,
        store
      } = props.ctx || props;
      let pageProps = {};

      if (BaseComponent.getInitialProps) {
        pageProps = await BaseComponent.getInitialProps(props);
      } // Stop saga on the server


      if (isServer) {
        store.dispatch(_reduxSaga.END);
        if (store.sagaTask.toPromise) await store.sagaTask.toPromise();else await store.sagaTask.done;
      }

      return pageProps;
    }

    render() {
      return _react.default.createElement(BaseComponent, this.props);
    }

  }

  _defineProperty(WrappedComponent, "displayName", `withReduxSaga(${BaseComponent.displayName || BaseComponent.name || 'BaseComponent'})`);

  return WrappedComponent;
}

var _default = withReduxSaga;
exports.default = _default;