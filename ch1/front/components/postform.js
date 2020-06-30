import React, { useState, useCallback, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from "../reducers/post";
import { backUrl } from "../config/config";

const PostForm = () => {
  const { imagePaths, isAddingPost, isAddedPost } = useSelector(
    (state) => state.post
  );
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("please write something");
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append("image", i);
    });
    formData.append("content", text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    console.log(imageInput.current);
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImage = useCallback((e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (currentValue) => {
      imageFormData.append("image", currentValue);
    });
    console.log(imageFormData.getAll("image"));
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickRemoveImage = useCallback(
    (index) => () => {
      dispatch({ type: REMOVE_IMAGE, data: index });
    },
    []
  );

  useEffect(() => {
    if (isAddedPost) {
      setText("");
    }
  }, [isAddedPost]);

  return (
    <React.Fragment>
      <Form encType="multipart/form-data" onFinish={onSubmitForm}>
        <Form.Item>
          <Input.TextArea
            maxLength={140}
            placeholder="What is your latest news?"
            value={text}
            onChange={onChangeText}
          ></Input.TextArea>
        </Form.Item>

        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImage}
        />
        <Button onClick={onClickImageUpload}>Upload Image</Button>
        <Button
          htmlType="submit"
          type="primary"
          style={{ float: "right" }}
          loading={isAddingPost}
        >
          Submit
        </Button>
        <div>
          {imagePaths.map((v, i) => {
            return (
              <div key={i} style={{ display: "inline - block" }}>
                <img src={v} alt={v} style={{ width: "200px" }}></img>
                <div>
                  <Button onClick={onClickRemoveImage(i)}>Delete</Button>
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    </React.Fragment>
  );
};

export default PostForm;
