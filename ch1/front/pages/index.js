import React from "react";
import Link from "next/link";
import { Form, Input, Button, Card } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Postform from "../components/postform";
import { useSelector } from "react-redux";

const Home = () => {
  const { mainPosts, imagePaths } = useSelector((state) => state.post);
  return (
    <React.Fragment>
      <Postform></Postform>
      <Input type="file" multiple hidden></Input>
      <div>
        {imagePaths.map((x) => {
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
      {mainPosts.map((v, i) => {
        return (
          <Card
            key={v}
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
              title={v.userPost.nickName}
              description={v.content}
            ></Card.Meta>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default Home;
