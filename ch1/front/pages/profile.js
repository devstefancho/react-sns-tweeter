import React, { useEffect, useCallback } from "react";
import { Alert, Form, Input, Button, List, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import Nickchangeform from "../components/nickchangeform";
import { useDispatch, useSelector } from "react-redux";
import {
  LOG_IN,
  LOG_OUT,
  loginAction,
  logoutAction,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_REQUEST,
} from "../reducers/user";

const Profile = () => {
  const dispatch = useDispatch();
  const { me, userInfo, followerList, followingList } = useSelector(
    (state) => state.user
  );
  // useEffect(() => {
  //   dispatch(loginAction);
  //   dispatch(logoutAction);
  // }, []);

  useEffect(() => {
    if (me) {
      dispatch({ type: LOAD_FOLLOWERS_REQUEST, data: me.id });
      dispatch({ type: LOAD_FOLLOWINGS_REQUEST, data: me.id });
    }
  }, [me && me.id]);

  const onClickRemoveFollower = useCallback(
    (unFollowingId) => () => {
      dispatch({ type: REMOVE_FOLLOWER_REQUEST, data: unFollowingId });
    },
    []
  );
  const onClickUnFollow = useCallback(
    (unFollowId) => () => {
      dispatch({ type: UNFOLLOW_REQUEST, data: unFollowId });
    },
    []
  );

  return (
    <React.Fragment>
      {me && <Alert message="user Login success !!" type="success" />}
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
        dataSource={followingList}
        renderItem={(item) => (
          <List.Item>
            <Card
              actions={[<StopOutlined twoToneColor="#eb2f96" />]}
              onClick={onClickUnFollow(item.id)}
            >
              <Card.Meta description={item.nickname}></Card.Meta>
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
        dataSource={followerList}
        renderItem={(item) => (
          <List.Item>
            <Card
              actions={[<StopOutlined twoToneColor="#eb2f96" />]}
              onClick={onClickRemoveFollower(item.id)}
            >
              <Card.Meta description={item.nickname}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
    </React.Fragment>
  );
};

export default Profile;
