import React, { Component } from "react";
import Helmet from "react-helmet";
import Document, { Main, NextScript } from "next/document";
import PropTypes from "prop-types";

class MyDocument extends Document {
  static getInitialProps(ctx) {
    const page = ctx.renderPage((App) => (props) => <App {...props} />);
    return { ...page, helmet: Helmet.renderStatic() };
  }
  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>
          {Object.values(helmet).map((el) => el.toComponent())}
          <title>This is single post</title>
        </head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.propTypes = {
  helmet: PropTypes.object.isRequired,
};

export default MyDocument;
