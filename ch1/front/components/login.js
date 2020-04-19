import React from "react";
import { Form, Button, Input } from "antd";
import { useInput } from "../pages/signup";

const Login = () => {
  const [loginId, onChangeLoginId] = useInput("");
  const [loginPassword, onChangeLoginPassword] = useInput("");

  const onSubmitLogin = () => {
    console.log(loginId, loginPassword);
  };

  return (
    <React.Fragment>
      <Form name="user-login" onFinish={onSubmitLogin} layout={"vertical"}>
        <Form.Item
          label="user-id"
          name="user-id"
          rules={[{ required: true, message: "Please input your ID" }]}
          onChange={onChangeLoginId}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="user-password"
          name="user-password"
          rules={[{ required: true, message: "Please input your Password" }]}
          onChange={onChangeLoginPassword}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Login;
