import { useState } from "react";
import { Button, Drawer, Space } from "antd";
const FormDrawer = ({ open, onClose, record }) => {
  return (
    <>
      <Drawer
        title="Edit Theme"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        zIndex={99999}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default FormDrawer;
