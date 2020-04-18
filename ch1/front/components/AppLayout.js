import React from "react";
import { Menu, Input, Button } from "antd";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="nodebird">
          <Link href="/">
            <a>Node Bird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Button>회원가입</Button>
      {children}
    </div> // Applayout을 import한 Index.js에서 AppLayout의 내부에 있는 컴포넌트들이 children자리로 들어가는 것
  );
};

export default AppLayout;
