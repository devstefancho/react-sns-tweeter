import React from "react";
import PropTypes from "prop-types";

const Hashtag = ({ tag }) => {
  console.log("tag *******", tag);
  return <div>Tag name : {tag} !!</div>;
};

Hashtag.propType = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = (context) => {
  console.log("hashtag getInitialProps ***", context.query.tag);
  return { tag: context.query.tag };
};

export default Hashtag;
