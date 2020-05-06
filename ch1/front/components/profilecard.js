import React from "react";
import { Card, Avatar, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../reducers/user";

const Profilecard = ({}) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <Card
        // style={{}}
        actions={[
          <div key="twit">
            Tweet
            <br />
            {me.Posts ? me.Posts.length : 0}
          </div>,
          <div key="following">
            Following
            <br />
            {me.Followings ? me.Followings.length : 0}
          </div>,
          <div key="follower">
            Follower
            <br />
            {me.Followers ? me.Followers.length : 0}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={me.userId}
          description={me.nickname}
        />
      </Card>
      <Button
        style={{ margin: "10px", float: "right" }}
        type="primary"
        onClick={() => {
          dispatch(LOG_OUT);
        }}
      >
        LOGOUT
      </Button>
    </React.Fragment>
  );
};

export default Profilecard;
