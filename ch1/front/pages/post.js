import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { backUrl, frontUrl } from "../config/config";

const post = ({ id }) => {
  const { singlePost } = useSelector((state) => state.post);
  return (
    <React.Fragment>
      <Helmet
        meta={[
          {
            name: "description",
            content: singlePost.content,
          },
          {
            property: "og:title",
            content: `${singlePost.User.nickname}`,
          },
          {
            property: "og:description",
            content: singlePost.content,
          },
          {
            property: "og:image",
            content: singlePost.Images[0] && singlePost.Images[0].src,
          },
          {
            property: "og:url",
            content: `${frontUrl}/post/${id}`,
          },
        ]}
      />
      <div>{singlePost.content}</div>
      <div>{singlePost.User && singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && <img src={singlePost.Images[0].src}></img>}
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
