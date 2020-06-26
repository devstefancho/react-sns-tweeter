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
import FollowList from "../components/FollowList";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    me,
    followerList,
    followingList,
    hasMoreFollower,
    hasMoreFollowing,
  } = useSelector((state) => state.user);
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

      <FollowList
        header="Following"
        hasMore={hasMoreFollowing}
        onLoadMore={onLoadMoreFollowings}
        onClickIconX={onClickUnFollow}
        itemList={followingList}
      ></FollowList>
      <FollowList
        header="Followwer"
        hasMore={hasMoreFollower}
        onLoadMore={onLoadMoreFollowers}
        onClickIconX={onClickRemoveFollower}
        itemList={followerList}
      ></FollowList>
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
