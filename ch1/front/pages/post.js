import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LOAD_POST_REQUEST } from "../reducers/post";

const post = ({ id }) => {
  const { singlePost } = useSelector((state) => state.post);
  return (
    <React.Fragment>
      <div>{singlePost.content}</div>
      <div>{singlePost.User && singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && (
          <img src={`http://localhost:3065/${singlePost.Images[0].src}`}></img>
        )}
      </div>
    </React.Fragment>
  );
};

post.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default post;
