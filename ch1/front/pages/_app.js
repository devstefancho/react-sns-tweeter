import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Proptypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducers";
import rootSaga from "../sagas";
import createSagaMiddleware from "redux-saga";

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
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  console.log(pageProps);
  return { pageProps };
};

const configure = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
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
  sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configure)(NodeBird);
