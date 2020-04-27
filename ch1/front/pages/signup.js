import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Form, Input, InputNumber, Button, Checkbox, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

//Custom hook for input form and export for reusable
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Signup = () => {
  const { isSigningUp } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const validateMessages = {
    required: "${name} is required!",
  };
  const layout = {
    style: { padding: "20px" },
    labelCol: { span: 12 },
    // wrapperCol: { span: 6 },
  };

  const [id, onChangeId] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const [checkBox, setCheckBox] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [checkBoxErr, setCheckBoxErr] = useState(true);

  const onSubmit = useCallback(() => {
    if (password !== passwordConfirm) {
      console.log("password is invalid or checkbox is unchecked");
      console.log(`password: ${password}, confirm: ${passwordConfirm}`);
      return setPasswordErr(true);
    } else {
      dispatch({ type: SIGN_UP_REQUEST, data: { id, nickName, password } });
      console.log("password correct and box checked");
      return setPasswordErr(false);
    }
  }, [id, password, passwordConfirm]);

  const onChangeCheckBox = useCallback((e) => {
    setCheckBoxErr(checkBox);
    setCheckBox(e.target.checked);
  });

  return (
    <React.Fragment>
      <Form {...layout} onFinish={onSubmit} validateMessages={validateMessages}>
        <Form.Item
          name="id"
          label="ID"
          value={id}
          rules={[{ required: true }]}
          onChange={onChangeId}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickname"
          label="Nick Name"
          value={nickName}
          rules={[{ required: true }]}
          onChange={onChangeNickName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          value={password}
          rules={[{ required: true }]}
          onChange={onChangePassword}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          rules={[{ required: true }]}
          onChange={onChangePasswordConfirm}
        >
          <Input.Password />
        </Form.Item>
        {passwordErr && <div style={{ color: "red" }}>Password is invalid</div>}
        <Checkbox onChange={onChangeCheckBox} style={{ marginBottom: "20px" }}>
          Confirm it?
        </Checkbox>
        {checkBoxErr && <div style={{ color: "red" }}>Should be Checked!</div>}
        <br />
        <Button
          type="primary"
          htmlType="submit"
          value={checkBox}
          loading={isSigningUp}
        >
          SUBMIT
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Signup;
