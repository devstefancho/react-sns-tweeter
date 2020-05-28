import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { PlusCircleOutlined } from "@ant-design/icons";
import ImagesZoom from "./imagesZoom";

const PostImages = ({ post }) => {
  const [openImagesZoom, setOpenImagesZoom] = useState(false);
  const onClickZoomIn = useCallback(() => {
    setOpenImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setOpenImagesZoom(false);
  }, []);

  if (post.Images.length === 1) {
    return (
      <img alt={post} src={`http://localhost:3065/${post.Images[0].src}`} />
    );
  } else if (post.Images.length === 2) {
    return (
      <React.Fragment>
        <img
          style={{ width: "50%", height: "auto" }}
          alt={post}
          src={`http://localhost:3065/${post.Images[0].src}`}
        />
        <img
          style={{ width: "50%", height: "auto" }}
          alt={post}
          src={`http://localhost:3065/${post.Images[1].src}`}
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <img
          style={{ width: "50%", height: "auto", display: "inline-block" }}
          alt={post}
          src={`http://localhost:3065/${post.Images[0].src}`}
          onClick={onClickZoomIn}
        />
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <PlusCircleOutlined style={{ fontSize: "3em", padding: 10 }} />
          <br />
          {post.Images.length - 1} more photos
        </div>
        {openImagesZoom && (
          <ImagesZoom images={post.Images} onClose={onClose} />
        )}
      </React.Fragment>
    );
  }
};

export default PostImages;
