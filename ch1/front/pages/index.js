import React, { useEffect, useState } from "react";
import Postform from "../components/postform";
import PostCard from "../components/postcard";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { mainPosts, isAddedPost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  return (
    <React.Fragment>
      {me && <Postform />}
      {mainPosts.map((v, i) => {
        // console.log(`${JSON.stringify(v)}`);
        return <PostCard key={i} post={v} />;
      })}
    </React.Fragment>
  );
};

export default Home;
