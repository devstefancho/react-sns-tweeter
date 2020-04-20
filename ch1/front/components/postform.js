import React from "react";
import { Form, Input } from "antd";

const Postform = () => {
  return (
    <React.Fragment>
      <Form encType="multipart/form-data">
        <Form.Item>
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            maxLength={140}
            placeholder="What is your latest news?"
          ></Input.TextArea>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default Postform;
