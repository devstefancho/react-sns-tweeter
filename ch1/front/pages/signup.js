import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Form, Input, InputNumber, Button, Checkbox, Layout } from "antd";

//Custom hook for input form and export for reusable
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Signup = () => {
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

  const onSubmit = () => {
    if (password !== passwordConfirm) {
      console.log("password is invalid");
      return setPasswordErr(true);
    } else {
      console.log("password correct");
      return setPasswordErr(false);
    }
    console.log(id, password, checkBox);
  };

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
          label="Confirm Password"
          value={passwordConfirm}
          rules={[{ required: true }]}
        >
          <Input.Password
            onChange={onChangePasswordConfirm}
            name="passwordConfirm"
          />
          {passwordErr && (
            <div style={{ color: "red" }}>Password is invalid</div>
          )}
        </Form.Item>
        <Checkbox onChange={onChangeCheckBox} style={{ marginBottom: "20px" }}>
          Confirm it?
        </Checkbox>
        {checkBoxErr && <div style={{ color: "red" }}>Should be Checked!</div>}
        <br />
        <Button type="primary" htmlType="submit" value={checkBox}>
          SUBMIT
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Signup;
