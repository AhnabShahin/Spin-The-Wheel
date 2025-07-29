import { useState } from "react";
import { Button, Drawer, Space } from "antd";
import ThemeForm from "./ThemeForm";
const FormDrawer = ({ drawerOpen, setDrawerOpen, onClose, record }) => {
  function handleSubmit(values) {
    // submit the form data in the api http://wordpress.test/wp-json/stw/v1/template/roulette-theme

  }

  return (
    <>
      <Drawer
        title="Edit Theme"
        placement="right"
        size="large"
        onClose={() => {}}
        open={drawerOpen}
        zIndex={99999}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <ThemeForm handleSubmit={handleSubmit} />
      </Drawer>
    </>
  );
};
export default FormDrawer;
