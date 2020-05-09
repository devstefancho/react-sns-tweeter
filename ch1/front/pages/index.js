import React, { useEffect } from "react";
import Postform from "../components/postform";
import PostCard from "../components/postcard";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { mainPosts, isAddedPost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [isAddedPost == true]);

  return (
    <React.Fragment>
      {me && <Postform />}
      {mainPosts.map((v, i) => {
        return <PostCard key={i} post={v} />;
      })}
    </React.Fragment>
  );
};

export default Home;
