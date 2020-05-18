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
import {
  ADD_COMMENT_REQUEST,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_COMMENTS_REQUEST,
} from "../reducers/post";

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
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmitComment = useCallback(() => {
    if (!me) {
      return alert("Please Login First");
    }
    console.log("submit comment");
    console.log(commentText);
    console.log(post);
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id },
    });
  }, [me, commentText]);

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
