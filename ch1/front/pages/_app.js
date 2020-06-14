import React from "react";
import axios from "axios";
import Head from "next/head";
import Proptypes from "prop-types";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";

import reducer from "../reducers";
import rootSaga from "../sagas";
import AppLayout from "../components/AppLayout";
import { LOAD_USER_REQUEST } from "../reducers/user";

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <title>Node bird with react</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.3/antd.css" //ant-desing CDN으로 직접 css를 import하려면 웹펙에서 설정을 해줘야함
          />
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </React.Fragment>
  );
};

NodeBird.propTypes = {
  Component: Proptypes.elementType,
  pageProps: Proptypes.object.isRequired,
};

NodeBird.getInitialProps = async (context) => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }
  console.log(pageProps);
  return { pageProps };
};

const configure = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    (store) => (next) => (action) => {
      console.log("middleware action!");
      console.log(action);
      next(action);
    },
  ];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window !== "undefined" &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        );

  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configure)(withReduxSaga(NodeBird));
