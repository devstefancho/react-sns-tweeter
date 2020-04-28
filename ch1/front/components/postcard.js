import React, { useState } from "react";
import { Card, Button, Avatar, Input, Comment, List, Form } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const PostCard = ({ post }) => {
  const [commentState, setCommentState] = useState(false);
  const onCommentToggle = () => {
    setCommentState((prev) => !prev);
  };

  return (
    <React.Fragment>
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
        extra={<Button>Delete</Button>}
      >
        <Card.Meta
          title={post.userPost.nickName}
          description={post.content}
        ></Card.Meta>
      </Card>
      {false && comments.length > 0 && <CommentList comments={comments} />}
      {commentState && (
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={<Editor />}
        />
      )}
    </React.Fragment>
  );
};

const Editor = () => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={false} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export default PostCard;
