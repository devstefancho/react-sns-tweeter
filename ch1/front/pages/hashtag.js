import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/postcard";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";

const Hashtag = ({ tag }) => {
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOAD_HASHTAG_POSTS_REQUEST, data: tag });
  }, []);
  return (
    <div>
      {mainPosts.map((v, i) => {
        return <PostCard key={i} post={v} />;
      })}
    </div>
  );
};

Hashtag.propType = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = (context) => {
  console.log("hashtag getInitialProps ***", context.query.tag);
  return { tag: context.query.tag };
};

export default Hashtag;
