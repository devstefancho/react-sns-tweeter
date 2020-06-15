import React, { useEffect, useCallback } from "react";
import { Alert, Button, List, Card } from "antd";
import { StopOutlined, StarTwoTone } from "@ant-design/icons";
import Nickchangeform from "../components/nickchangeform";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_REQUEST,
} from "../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/postcard";

const Profile = () => {
  const dispatch = useDispatch();
  const { me, followerList, followingList } = useSelector(
    (state) => state.user
  );
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (me) {
      dispatch({ type: LOAD_FOLLOWERS_REQUEST, data: me.id });
      dispatch({ type: LOAD_FOLLOWINGS_REQUEST, data: me.id });
      dispatch({ type: LOAD_USER_POSTS_REQUEST, data: me.id });
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
  const onLoadMoreFollowers = useCallback(() => {
    dispatch({ type: LOAD_FOLLOWERS_REQUEST, offset: followerList.length });
  }, [followerList && followerList.length]);
  const onLoadMoreFollowings = useCallback(() => {
    dispatch({ type: LOAD_FOLLOWINGS_REQUEST, offset: followingList.length });
  }, [followerList && followingList.length]);

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
            <Button onClick={onLoadMoreFollowings}>More</Button>
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
            <Button onClick={onLoadMoreFollowers}>More</Button>
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
      {me && mainPosts.map((c, i) => <PostCard key={i} post={c} />)}
    </React.Fragment>
  );
};

Profile.getInitialProps = async (context) => {
  const state = context.store.getState();
  const me = state.user.me;
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: me && me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: me && me.id,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: me && me.id,
  });
};

export default Profile;
