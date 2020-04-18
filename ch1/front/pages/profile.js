import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import Link from "next/link";

const Profile = () => {
  return (
    <div>
      <Head>
        <title>Profile page</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.3/antd.css" //ant-desing CDN으로 직접 css를 import하려면 웹펙에서 설정을 해줘야함
        />
      </Head>
      <AppLayout>
        <div>Profile</div>
      </AppLayout>
    </div>
  );
};

export default Profile;
