import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Form, Input, InputNumber, Button, Checkbox, Layout } from "antd";

const Signup = () => {
  const validateMessages = {
    required: "${name} is required!",
  };
  const layout = {
    style: { padding: "20px" },
    labelCol: { span: 12 },
    // wrapperCol: { span: 6 },
  };

  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const [checkBoxErr, setCheckBoxErr] = useState("");

  const onSubmit = () => {
    console.log(id, password, checkBox);
  };

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  });
  const onChangeNickName = useCallback((e) => {
    setNickName(e.target.value);
  });
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  });
  const onChangePasswordConfirm = useCallback((e) => {
    setPasswordErr(e.target.value !== password);
    setPasswordConfirm(e.target.value);
  });
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
