import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { PlusCircleOutlined } from "@ant-design/icons";
import ImagesZoom from "./imagesZoom";
import { backUrl } from "../config/config";

const PostImages = ({ image }) => {
  const [openImagesZoom, setOpenImagesZoom] = useState(false);
  const onClickZoomIn = useCallback(() => {
    setOpenImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setOpenImagesZoom(false);
  }, []);

  if (image.length === 1) {
    return <img alt={image} src={image[0].src} />;
  } else if (image.length === 2) {
    return (
      <React.Fragment>
        <img
          style={{ width: "50%", height: "auto" }}
          alt={image}
          src={image[0].src}
        />
        <img
          style={{ width: "50%", height: "auto" }}
          alt={image}
          src={image[1].src}
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <img
          style={{ width: "50%", height: "auto", display: "inline-block" }}
          alt={image}
          src={image[0].src}
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
          {image.length - 1} more photos
        </div>
        {openImagesZoom && <ImagesZoom images={image} onClose={onClose} />}
      </React.Fragment>
    );
  }
};

export default PostImages;
