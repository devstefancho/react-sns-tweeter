import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";

const FollowButton = ({ post, onClickUnfollow, onClickFollow }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      {!me || post.User.id === me.id ? null : me.Followings &&
        me.Followings.find((v) => v.id === post.User.id) ? (
        <Button onClick={onClickUnfollow(post.User.id)}>UNFOLLOW</Button>
      ) : (
        <Button onClick={onClickFollow(post.User.id)}>FOLLOW</Button>
      )}
    </>
  );
};

export default FollowButton;
