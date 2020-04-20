import React from "react";
import { Form, Input, Button, List, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import Nickchangeform from "../components/nickchangeform";

const Profile = () => {
  return (
    <React.Fragment>
      <Nickchangeform></Nickchangeform>
      <List
        itemLayout="horizontal"
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4 }}
        size="small"
        header="Following"
        loadMore={
          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              height: 32,
              lineHeight: "32px",
            }}
          >
            <Button>More</Button>
          </div>
        }
        bordered
        dataSource={["zechprusa", "toInfinity", "BuzzLighter"]}
        renderItem={(item) => (
          <List.Item>
            <Card actions={[<StopOutlined twoToneColor="#eb2f96" />]}>
              <Card.Meta description={item}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
      <List
        itemLayout="horizontal"
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4 }}
        size="small"
        header="Follower"
        loadMore={
          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              height: 32,
              lineHeight: "32px",
            }}
          >
            <Button>More</Button>
          </div>
        }
        bordered
        dataSource={["zechprusa", "toInfinity", "BuzzLighter"]}
        renderItem={(item) => (
          <List.Item>
            <Card actions={[<StopOutlined twoToneColor="#eb2f96" />]}>
              <Card.Meta description={item}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
    </React.Fragment>
  );
};

export default Profile;
