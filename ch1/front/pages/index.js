import React from "react";
import Postform from "../components/postform";
import PostCard from "../components/postcard";
import { useSelector } from "react-redux";

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
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
