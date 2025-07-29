// import { useState } from '@wordpress/element';
import { useState } from "react";
import FormDrawer from "./Form/FormDrawer";
import ThemeList from "./List/ThemeList";
import { Flex } from "antd";

function Init() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div className="spin-wheel-admin-theme-container">
      <div className="spin-wheel-admin-theme-header">
        <Flex wrap gap="small" justify={"space-between"} align={"center"}>
          <h1>Spin The Wheels Settings</h1>

          <div className="spin-wheel-admin-theme-header-actions">
            <button
              className="button button-primary"
              style={{ marginLeft: "16px" }}
              onClick={() => {
                setOpen(true);
                setSelectedRecord(null);
              }}
            >
              Add New Theme
            </button>
            <button
              className="button button-secondary"
              style={{ marginLeft: "16px" }}
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              Add New Theme
            </button>
          </div>
        </Flex>

        <ThemeList />
        <FormDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </div>
    </div>
  );
}

export default Init;
