import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/postcard";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";

const Hashtag = ({ tag }) => {
  const { mainPosts } = useSelector((state) => state.post);
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
  const tag = context.query.tag;
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
