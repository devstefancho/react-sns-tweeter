import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s]+)/g).map((v, i) => {
        if (v.includes("#")) {
          const hashtag = v;
          return (
            <Link
              key={i}
              href={{
                pathname: "/hashtag",
                query: { tag: v.slice(1) },
              }}
              as={`/hashtag/${v.slice(1)}`}
            >
              <a>{hashtag}</a>
            </Link>
          );
        } else {
          return v;
        }
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
