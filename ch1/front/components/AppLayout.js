import React from "react";
import {
  Menu,
  Input,
  Button,
  Row,
  Col,
  Divider,
  Card,
  Avatar,
  Form,
} from "antd";
import Link from "next/link";
import Login from "../components/login";
import Profilecard from "../components/profilecard";

const dummyData = {
  isLogged: true,
  title: "SUNGJIN",
  description: "this is nodebrid",
};

const AppLayout = ({ children }) => {
  return (
    <React.Fragment>
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
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      >
        Info Section
      </Divider>
      <Row gutter={16}>
        <Col span={6}>
          {dummyData.isLogged ? (
            <Profilecard dummy={dummyData}></Profilecard>
          ) : (
            <Login></Login>
          )}
        </Col>
        <Col span={12}>{children}</Col>
        <Col span={6}>right side menu</Col>
      </Row>
    </React.Fragment> // Applayout을 import한 Index.js에서 AppLayout의 내부에 있는 컴포넌트들이 children자리로 들어가는 것
  );
};

export default AppLayout;
