import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  Card,
  Button,
  Avatar,
  Input,
  Comment,
  List,
  Form,
  Popover,
} from "antd";
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
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from "../reducers/post";
import PostImages from "./postImages";
import PostCardContent from "./PostCardContent";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector((state) => state.user);
  const {
    isAddedComment,
    isAddingComment,
    isAddedPost,
    mainPosts,
  } = useSelector((state) => state.post);
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

  const onRetweet = useCallback(() => {
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me && me.id, post && post.id]);

  const onClickUnfollow = useCallback(
    (postUserId) => () => {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: postUserId,
      });
    },
    []
  );
  const onClickFollow = useCallback(
    (postUserId) => () => {
      dispatch({
        type: FOLLOW_REQUEST,
        data: postUserId,
      });
    },
    []
  );

  const onClickDeletePost = useCallback(
    (postId) => () => {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: postId,
      });
    },
    []
  );

  return (
    <div>
      <Card
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗 되었습니다.` : null
        }
        key={+post.createdAt}
        hoverable
        style={{ padding: 10, marginTop: 10 }}
        cover={
          post.Images &&
          post.Images[0] && (
            <PostImages image={post.Images} />
            // <img
            //   alt={post}
            //   src={`http://localhost:3065/${post.Images[0].src}`}
            // />
          )
        }
        actions={
          Liked
            ? [
                <RetweetOutlined onClick={onRetweet} />,
                <HeartFilled
                  style={{ color: "#eb2f96" }}
                  onClick={onLikeToggle}
                />,
                <MessageOutlined onClick={onCommentToggle} />,
                <Popover
                  content={
                    <div>
                      {me && post.UserId === me.id ? (
                        <React.Fragment>
                          <p>Amend</p>
                          <p onClick={onClickDeletePost(post.id)}>Delete</p>
                        </React.Fragment>
                      ) : (
                        <p>Report</p>
                      )}
                    </div>
                  }
                  trigger="hover"
                >
                  <EllipsisOutlined />
                </Popover>,
              ]
            : [
                <RetweetOutlined onClick={onRetweet} />,
                <HeartOutlined onClick={onLikeToggle} />,
                <MessageOutlined onClick={onCommentToggle} />,
                <Popover
                  content={
                    <div>
                      {me && post.UserId === me.id ? (
                        <React.Fragment>
                          <p>Amend</p>
                          <p onClick={onClickDeletePost(post.id)}>Delete</p>
                        </React.Fragment>
                      ) : (
                        <p>Report</p>
                      )}
                    </div>
                  }
                  trigger="hover"
                >
                  <EllipsisOutlined />
                </Popover>,
              ]
        }
        extra={
          !me || post.User.id === me.id ? null : me.Followings &&
            me.Followings.find((v) => v.id === post.User.id) ? (
            <Button onClick={onClickUnfollow(post.User.id)}>UNFOLLOW</Button>
          ) : (
            <Button onClick={onClickFollow(post.User.id)}>FOLLOW</Button>
          )
        }
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages image={post.Retweet.Images}></PostImages>
              )
            }
          >
            <Card.Meta
              avatar={
                // <Avatar>{"dummy"}</Avatar>
                <Link
                  href={{
                    pathname: "/user",
                    query: { id: post.Retweet.User.id },
                  }}
                  as={`/user/${post.Retweet.User.id}`}
                >
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              // title="dummy"
              title={post.Retweet.User.nickname}
              // description="dummy"
              description={<PostCardContent postData={post.Retweet.content} />}
            ></Card.Meta>
          </Card>
        ) : (
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
            description={<PostCardContent postData={post.content} />}
          ></Card.Meta>
        )}
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
