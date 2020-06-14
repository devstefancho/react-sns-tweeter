import React, { useCallback } from "react";
import { Form, Button, Input } from "antd";
import { useInput } from "../pages/signup";
import { useSelector, useDispatch } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";

const LoginForm = () => {
  const [loginId, onChangeLoginId] = useInput("");
  const [loginPassword, onChangeLoginPassword] = useInput("");
  const dispatch = useDispatch();
  const { isLogging } = useSelector((state) => state.user);

  const onSubmitLogin = useCallback(() => {
    console.log(loginId, loginPassword);
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userId: loginId,
        password: loginPassword,
      },
    });
  }, [loginId, loginPassword]);
  // const { me } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <Form
        name="user-login"
        onFinish={onSubmitLogin}
        layout={"vertical"}
        style={{ margin: "10px" }}
      >
        <Form.Item
          label="user-id"
          name="user-id"
          rules={[{ required: true, message: "Please input your ID" }]}
          onChange={onChangeLoginId}
        >
          <Input value={loginId} />
        </Form.Item>
        <Form.Item
          label="user-password"
          name="user-password"
          rules={[{ required: true, message: "Please input your Password" }]}
          onChange={onChangeLoginPassword}
        >
          <Input.Password value={loginPassword} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ float: "right" }}
            loading={isLogging}
          >
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default LoginForm;
