import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Card, Button, Avatar, Input, Comment, List, Form } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { ADD_COMMENT_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector((state) => state.user);
  const { isAddedComment, isAddingComment, isAddedPost } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("effect");
    setCommentText("");
  }, [isAddedComment === true]);

  const onCommentToggle = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmitComment = useCallback(() => {
    if (!me) {
      return alert("Please Login First");
    }
    console.log("submit");
    console.log(post.id);
    return dispatch({ type: ADD_COMMENT_REQUEST, data: { postId: post.id } });
  }, [me && me.id]);

  return (
    <div>
      <Card
        key={+post.createdAt}
        hoverable
        style={{ width: 240, padding: 10, marginTop: 10 }}
        cover={post.img && <img alt={post} src={post.img} />}
        actions={[
          <RetweetOutlined />,
          <HeartOutlined />,
          <MessageOutlined onClick={onCommentToggle} />,
          <EllipsisOutlined />,
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={
            <Link
              href={{
                pathname: "/user",
                query: { id: parseInt(post.User.id) },
              }}
              as={`/user/${post.User.id}`}
            >
              <a>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={post.User.nickname}
          description={post.content.split(/(#[^\s]+)/g).map((v) => {
            if (v.includes("#")) {
              const hashtag = v;
              return (
                <Link
                  key={v}
                  href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
                  as={`/hashtag/${v.slice(1)}`}
                >
                  <a>{hashtag}</a>
                </Link>
              );
            } else {
              return v;
            }
          })}
        ></Card.Meta>
      </Card>
      {commentFormOpened && (
        <React.Fragment>
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
                  author={item.userId}
                  avatar={<Avatar>{item.User.nickName[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default PostCard;
