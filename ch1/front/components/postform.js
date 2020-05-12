import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const { imagePaths, isAddingPost, isAddedPost } = useSelector(
    (state) => state.post
  );
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("please write something");
    }
    dispatch({ type: ADD_POST_REQUEST, data: { content: text.trim() } });
  }, [text]);

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

        <Input type="file" multiple hidden></Input>
        <div>
          {imagePaths.map((x) => {
            return (
              <div key={x} style={{ display: inline - block }}>
                <img
                  src={"localhost:/3050/" + x}
                  alt={x}
                  style={{ width: "200px" }}
                ></img>
              </div>
            );
          })}
        </div>
        <Button>Upload Image</Button>
        <Button
          htmlType="submit"
          type="primary"
          style={{ float: "right" }}
          loading={isAddingPost}
        >
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default PostForm;
