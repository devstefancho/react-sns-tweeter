import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar } from "antd";

import PostCard from "../components/postcard";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";

const User = ({ id }) => {
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_USER_POSTS_REQUEST, data: id });
  }, []);

  return (
    <div>
      {userInfo ? (
        <Card
          // style={{}}
          actions={[
            <div key="twit">
              Tweet
              <br />
              {userInfo.Posts ? userInfo.Posts.length : 0}
            </div>,
            <div key="following">
              Following
              <br />
              {userInfo.Followings ? userInfo.Followings.length : 0}
            </div>,
            <div key="follower">
              Follower
              <br />
              {userInfo.Followers ? userInfo.Followers.length : 0}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={userInfo.userId}
            description={userInfo.nickname}
          />
        </Card>
      ) : null}

      <div>
        {mainPosts.map((v, i) => (
          <PostCard key={i} post={v} />
        ))}
      </div>
    </div>
  );
};
User.propType = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = (context) => {
  console.log(context.query.id);
  return { id: parseInt(context.query.id) };
};

export default User;
