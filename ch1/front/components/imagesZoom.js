import React, { useState } from "react";
import Slider from "react-slick";
import { CloseSquareOutlined } from "@ant-design/icons";

const ImagesZoom = ({ images, onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          zIndex: 5000,
          width: "90%",
          top: "20%",
          left: "5%",
          border: "1px solid black",
          backgroundColor: "#ffffff",
        }}
      >
        <header
          style={{
            height: 44,
            background: "white",
            position: "relative",
            padding: 0,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "17px",
              color: "#333",
              lineHeight: "44px",
            }}
          >
            상세 이미지
          </h1>
          <div onClick={onClose}>
            <CloseSquareOutlined
              style={{
                fontSize: "3em",
                position: "absolute",
                right: 0,
                top: 0,
                padding: 15,
                lineHeight: "14px",
                cursor: "pointer",
              }}
            />
          </div>
        </header>

        <div>
          <Slider {...settings}>
            {images.map((v, i) => {
              return (
                <div key={i} style={{ padding: 32, textAlign: "center" }}>
                  <img
                    key={i}
                    alt={"image"}
                    src={`http://localhost:3065/${v.src}`}
                    style={{
                      width: "100%",
                      padding: 20,
                      //   margin: "0 auto",
                      height: "auto",
                    }}
                  ></img>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImagesZoom;
