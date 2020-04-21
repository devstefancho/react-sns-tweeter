import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Proptypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducers";

const NodeBird = ({ Component, store }) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <title>Node bird with react</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.3/antd.css" //ant-desing CDN으로 직접 css를 import하려면 웹펙에서 설정을 해줘야함
          />
        </Head>
        <AppLayout>
          <Component />
        </AppLayout>
      </Provider>
    </React.Fragment>
  );
};

NodeBird.propTypes = {
  Component: Proptypes.elementType,
};

export default withRedux((initialState, options) => {
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer &&
      typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  );

  const store = createStore(reducer, initialState, enhancer);
  return store;
})(NodeBird);
