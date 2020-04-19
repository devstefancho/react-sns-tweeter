import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import Proptypes from "prop-types";

const NodeBird = ({ Component }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

NodeBird.propTypes = {
  Component: Proptypes.elementType,
};

export default NodeBird;
