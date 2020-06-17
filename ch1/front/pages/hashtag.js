import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/postcard";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";

const Hashtag = ({ tag }) => {
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onScroll = () => {
    console.log(
      window.scrollY,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight
    );
    if (
      window.scrollY + document.documentElement.clientHeight + 300 >
      document.documentElement.scrollHeight
    ) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1].id,
          data: tag,
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePost, tag]);
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
