import React from "react";
import Link from "next/link";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Node bird with react</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.3/antd.css" //ant-desing CDN으로 직접 css를 import하려면 웹펙에서 설정을 해줘야함
        />
      </Head>
      <AppLayout>
        <Link href="/about">
          <a>about</a>
        </Link>
        <h1>Hello Home</h1>
      </AppLayout>
    </div>
  );
};

export default Home;
