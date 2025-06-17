import { StrictMode } from "@wordpress/element";
import { createRoot } from "@wordpress/element";
import { ConfigProvider } from "antd";
import Init from "./CoreNest/Init.jsx";
import themeConfig from "./CoreNest/config/themeConfig.json";

const container = document.getElementById("spin-the-wheel-admin");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <Init />
      </ConfigProvider>
    </StrictMode>
  );
}
