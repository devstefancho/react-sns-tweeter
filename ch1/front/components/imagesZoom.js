import React, { useState } from "react";
import Slider from "react-slick";
import { CloseSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { backUrl } from "../config/config";

const ImageWindow = styled.div`
  position: fixed;
  z-index: 5000;
  width: 90%;
  top: 20%;
  left: 5%;
  border: 1px solid #218cff;
  background-color: #ffffff;

  & header {
    height: 44;
    background-color: black;
    position: relative;
    padding: 0;
    text-align: center;
  }
  & h1 {
    color: #ffffff;
    fontsize: 17px;
    margin: 0px;
    line-height: 44px;
  }

  & img {
    width: 100%;
    padding: 30px;
    height: auto;
  }
`;

const CloseIcon = styled(CloseSquareOutlined)`
position: absolute;
cursor: pointer;
font-size: 3em;
color: white;
  line-height: 14px;
  top: 0;
  right: 0;
  padding: 15;
}}
`;

const ImagesZoom = ({ images, onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <>
      <ImageWindow>
        <header>
          <h1>상세 이미지</h1>
          <div onClick={onClose}>
            <CloseIcon />
          </div>
        </header>

        <div>
          <Slider {...settings}>
            {images.map((v, i) => {
              return (
                <div key={i} style={{ padding: 32, textAlign: "center" }}>
                  <img key={i} alt={"image"} src={v.src}></img>
                </div>
              );
            })}
          </Slider>
        </div>
      </ImageWindow>
    </>
  );
};

export default ImagesZoom;
