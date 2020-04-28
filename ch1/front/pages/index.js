import React from "react";
import Postform from "../components/postform";
import PostCard from "../components/postcard";
import { useSelector } from "react-redux";

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { isLogged } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      {isLogged && <Postform />}
      {mainPosts.map((v, i) => {
        return <PostCard key={i} post={v} />;
      })}
    </React.Fragment>
  );
};

export default Home;
