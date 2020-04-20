import React from "react";
import { Form, Input, Button } from "antd";

const Nickchangeform = () => {
  return (
    <Form>
      <Form.Item>
        <span>NickName</span>
        <Form.Item>
          <Input />
        </Form.Item>
        <Button style={{ float: "right" }} type="primary" htmlType="submit">
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Nickchangeform;
