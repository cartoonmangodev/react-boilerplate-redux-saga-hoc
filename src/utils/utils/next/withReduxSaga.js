/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { END } from 'redux-saga';

function withReduxSaga(BaseComponent = {}) {
  class WrappedComponent extends Component {
    static displayName = `withReduxSaga(${BaseComponent.displayName ||
      BaseComponent.name ||
      'BaseComponent'})`;

    static async getInitialProps(props = {}) {
      const isServer = props.ctx ? props.ctx.isServer : props.isServer;
      const store = props.ctx ? props.ctx.store : props.store;
      let pageProps = {};
      if (BaseComponent.getInitialProps) {
        pageProps = await BaseComponent.getInitialProps(props);
      }

      // Stop saga on the server
      if (isServer) {
        if (typeof store.sagaTask.done === 'function')
          setTimeout(() => {
            store.sagaTask.done();
            store.dispatch(END);
          }, 1);
        if (typeof store.sagaTask.toPromise === 'function') {
          await store.sagaTask.toPromise();
        }
      }

      return pageProps;
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return WrappedComponent;
}

export default withReduxSaga;
