import React, { useEffect, useState, useRef } from "react";
import Postform from "../components/postform";
import PostCard from "../components/postcard";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const lastIdRef = useRef([]);

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
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!lastIdRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId: lastId,
          });
          lastIdRef.current.push(lastId);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePost]);

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

Home.getInitialProps = async (context) => {
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
