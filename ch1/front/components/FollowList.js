import React from "react";
import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const FollowList = React.memo(
  ({
    // @ts-ignore
    header,
    // @ts-ignore
    hasMore,
    // @ts-ignore
    onLoadMore,
    // @ts-ignore
    onClickIconX,
    // @ts-ignore
    itemList,
  }) => {
    return (
      <List
        itemLayout="horizontal"
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4 }}
        size="small"
        header={header}
        loadMore={
          <div
            style={{
              textAlign: "center",
              marginTop: 12,
              height: 32,
              lineHeight: "32px",
            }}
          >
            {hasMore && <Button onClick={onLoadMore}>More</Button>}
          </div>
        }
        bordered
        dataSource={itemList}
        renderItem={(item) => (
          <List.Item>
            <Card
              actions={[<StopOutlined twoToneColor="#eb2f96" />]}
              onClick={onClickIconX(item.id)}
            >
              <Card.Meta description={item.nickname}></Card.Meta>
            </Card>
          </List.Item>
        )}
      ></List>
    );
    // @ts-ignore
  }
);

// @ts-ignore
FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onClickIconX: PropTypes.func.isRequired,
  FollowList: PropTypes.array,
};

export default FollowList;
