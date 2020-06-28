import React, { Component } from "react";
import Helmet from "react-helmet";
import Document, { Main, NextScript } from "next/document";
import PropTypes from "prop-types";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }
  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>
          {this.props.styleTags}
          {Object.values(helmet).map((el) => el.toComponent())}
          <title>This is single post</title>
        </head>
        <body {...bodyAttrs}>
          <Main />
          {process.env.NODE_ENV === "production" && (
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es2016%2Ces2017%2Ces2018%2Ces2019%2Ces2015%2Cdefault%2Ces5%2Ces6%2Ces7"></script>
          )}
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.propTypes = {
  helmet: PropTypes.object.isRequired,
  styleTags: PropTypes.object.isRequired,
};

export default MyDocument;
