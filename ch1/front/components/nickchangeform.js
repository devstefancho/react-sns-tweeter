import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { EDIT_NICKNAME_REQUEST } from "../reducers/user";

const Nickchangeform = () => {
  const dispatch = useDispatch();
  const [editNickname, setEditNickname] = useState();
  // @ts-ignore
  const { me, isEditting } = useSelector((state) => state.user);
  const onChangeEditNickname = useCallback(
    (e) => {
      setEditNickname(e.target.value);
    },
    [editNickname]
  );
  const onSubmitEditNickname = (e) => {
    dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: editNickname,
    });
    setEditNickname("");
  };

  return (
    <Form onFinish={onSubmitEditNickname}>
      <Form.Item>
        <span>NickName</span>
        <Form.Item>
          <Input
            placeholder={editNickname || (me && me.nickname)}
            value={editNickname}
            onChange={onChangeEditNickname}
          />
        </Form.Item>
        <Button
          style={{ float: "right" }}
          type="primary"
          htmlType="submit"
          loading={isEditting}
        >
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Nickchangeform;
