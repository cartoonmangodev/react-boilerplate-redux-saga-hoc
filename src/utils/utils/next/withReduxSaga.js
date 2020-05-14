/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { END } from 'redux-saga';

function withReduxSaga(BaseComponent) {
  class WrappedComponent extends Component {
    static displayName = `withReduxSaga(${BaseComponent.displayName ||
      BaseComponent.name ||
      'BaseComponent'})`;

    static async getInitialProps(props) {
      const { isServer, store } = props.ctx || props;
      let pageProps = {};
      if (BaseComponent.getInitialProps) {
        pageProps = await BaseComponent.getInitialProps(props);
      }

      // Stop saga on the server
      if (isServer) {
        store.dispatch(END);
        if (store.sagaTask.toPromise) await store.sagaTask.toPromise();
        else await store.sagaTask.done;
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
