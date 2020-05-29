import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Card, Button, Avatar, Input, Comment, List, Form } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
  HeartFilled,
} from "@ant-design/icons";
import {
  ADD_COMMENT_REQUEST,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_COMMENTS_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post";
import PostImages from "./postImages";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector((state) => state.user);
  const { isAddedComment, isAddingComment, isAddedPost } = useSelector(
    (state) => state.post
  );
  const Liked = me && post.Likers && post.Likers.find((v) => me.id === v.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("effect");
    setCommentText("");
  }, [isAddedComment === true]);

  const onCommentToggle = useCallback(() => {
    console.log(commentFormOpened);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmitComment = useCallback(() => {
    if (!me) {
      alert("Please Login First");
    }
    // console.log("submit comment");
    // console.log(commentText);
    // console.log(post);
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id },
    });
  }, [me, commentText]);

  const onLikeToggle = useCallback(() => {
    if (!me) {
      return alert("Please Login First");
    }
    if (Liked) {
      dispatch({ type: UNLIKE_POST_REQUEST, data: post.id });
    } else {
      dispatch({ type: LIKE_POST_REQUEST, data: post.id });
    }
  }, [me && me.id, post && post.id, Liked]);

  return (
    <div>
      <Card
        key={+post.createdAt}
        hoverable
        style={{ padding: 10, marginTop: 10 }}
        cover={
          post.Images[0] && (
            <PostImages post={post} />
            // <img
            //   alt={post}
            //   src={`http://localhost:3065/${post.Images[0].src}`}
            // />
          )
        }
        actions={
          Liked
            ? [
                <RetweetOutlined />,
                <HeartFilled
                  style={{ color: "#eb2f96" }}
                  onClick={onLikeToggle}
                />,
                <MessageOutlined onClick={onCommentToggle} />,
                <EllipsisOutlined />,
              ]
            : [
                <RetweetOutlined />,
                <HeartOutlined onClick={onLikeToggle} />,
                <MessageOutlined onClick={onCommentToggle} />,
                <EllipsisOutlined />,
              ]
        }
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={
            // <Avatar>{"dummy"}</Avatar>
            <Link
              href={{
                pathname: "/user",
                query: { id: post.User.id },
              }}
              as={`/user/${post.User.id}`}
            >
              <a>
                <Avatar>{post.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          // title="dummy"
          title={post.User.nickname}
          // description="dummy"
          description={
            post.User &&
            post.content.split(/(#[^\s]+)/g).map((v, i) => {
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
            })
          }
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
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname.slice(0, 3)}</Avatar>}
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
