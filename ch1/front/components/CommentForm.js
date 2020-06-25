import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, List, Comment, Avatar } from "antd";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { isAddingComment, isAddedComment } = useSelector(
    (state) => state.post
  );

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  useEffect(() => {
    // console.log("effect");
    setCommentText("");
  }, [isAddedComment === true]);

  const onSubmitComment = useCallback(() => {
    if (!me) {
      alert("Please Login First");
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id },
    });
  }, [me, commentText]);

  return (
    <>
      <Form onFinish={onSubmitComment}>
        <Form.Item>
          <Input.TextArea
            rows={4}
            value={commentText}
            onChange={onChangeCommentText}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isAddingComment}>
          Reply
        </Button>
      </Form>
      <List
        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
        itemLayout="horizontal"
        dataSource={post.Comments || []}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.User.nickname}
              avatar={<Avatar>{item.User.nickname.slice(0, 3)}</Avatar>}
              content={item.content}
            />
          </li>
        )}
      />
    </>
  );
};

export default CommentForm;
