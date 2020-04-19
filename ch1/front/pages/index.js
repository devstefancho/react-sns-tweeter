import React from "react";
import Link from "next/link";
import { Form, Input, Button, Card } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const dummy = {
  isLogged: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "CHo",
      },
      content: "first blog",
      img: "https://img.icons8.com/plasticine/2x/image.png",
    },
  ],
};

const Home = () => {
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
        <Input type="file" multiple hidden></Input>
        <div>
          {dummy.imagePaths.map((x) => {
            return (
              <div key={x} style={{ display: inline - block }}>
                <img
                  src={"localhost:/3050/" + x}
                  alt={x}
                  style={{ width: "200px" }}
                ></img>
              </div>
            );
          })}
        </div>
        <Button>Upload Image</Button>
        <Button htmlType="submit" type="primary" style={{ float: "right" }}>
          Submit
        </Button>
      </Form>
      {dummy.mainPosts.map((v, i) => {
        return (
          <Card
            hoverable
            style={{ width: 240, padding: 10, marginTop: 10 }}
            cover={v.img && <img alt={v} src={v.img} />}
            actions={[
              <RetweetOutlined />,
              <HeartOutlined />,
              <MessageOutlined />,
              <EllipsisOutlined />,
            ]}
            extra={<Button>Delete</Button>}
          >
            <Card.Meta
              title={v.User.nickname}
              description={v.content}
            ></Card.Meta>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default Home;
