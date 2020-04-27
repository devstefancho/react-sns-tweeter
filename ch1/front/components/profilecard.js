import React from "react";
import { Card, Avatar, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../reducers/user";

const Profilecard = ({}) => {
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <Card
        // style={{}}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={"id"}
          description={"description"}
        />
      </Card>
      <Button
        style={{ margin: "10px", float: "right" }}
        type="primary"
        onClick={() => {
          dispatch(LOG_OUT);
        }}
      >
        LOGOUT
      </Button>
    </React.Fragment>
  );
};

export default Profilecard;
