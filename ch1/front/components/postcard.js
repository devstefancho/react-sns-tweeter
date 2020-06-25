import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Card, Button, Avatar, Popover } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";

import {
  LOAD_COMMENTS_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from "../reducers/post";
import PostImages from "./postImages";
import PostCardContent from "./PostCardContent";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";
import CommentForm from "./CommentForm";
import FollowButton from "./FollowButton";

const CardWrapper = styled.div`
  margin-bottom: 40px;
`;

const PostCard = React.memo(({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me && state.user.me.id);
  const Liked = id && post.Likers && post.Likers.find((v) => id === v.id);
  const dispatch = useDispatch();
  moment.locale("en");

  /**
   * Check the state of re-rendering during Follow
   * 1. post 원인 아님
   console.log("post", post);
   useEffect(() => {
     console.log("post Effect", post);
   }, [post]);console.log("post", post);
   * 2. me 원인 맞음
   console.log(me);
   useEffect(() => {
     console.log("me Effect", me);
   }, [me]);
   * 3. me의 어느곳이 바뀌는지 체크
   const memory = useRef(me);
   useEffect(() => {
     console.log("me useEffect", memory.current, me, memory.current === me);
   }, [me]);
   */

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

  const onLikeToggle = useCallback(() => {
    if (!id) {
      return alert("Please Login First");
    }
    if (Liked) {
      dispatch({ type: UNLIKE_POST_REQUEST, data: post.id });
    } else {
      dispatch({ type: LIKE_POST_REQUEST, data: post.id });
    }
  }, [id, post && post.id, Liked]);

  const onRetweet = useCallback(() => {
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id, post && post.id]);

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
    <CardWrapper>
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
                      {id && post.UserId === id ? (
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
                      {id && post.UserId === id ? (
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
          <FollowButton
            post={post}
            onClickUnfollow={onClickUnfollow}
            onClickFollow={onClickFollow}
          ></FollowButton>
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
        {post && moment(post.createdAt).fromNow()}
      </Card>

      {commentFormOpened && <CommentForm post={post}></CommentForm>}
    </CardWrapper>
  );
});

export default PostCard;
