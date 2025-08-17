import { StrictMode } from "@wordpress/element";
import { createRoot } from "@wordpress/element";
import { ConfigProvider, App } from "antd";
import Init from "./CoreNest/Init.jsx";
import themeConfig from "./CoreNest/config/themeConfig.json";
import enUS from "antd/locale/en_US"; // Example: English locale
const container = document.getElementById("spin-the-wheel-admin");

if (container) {
  createRoot(container).render(
    // <StrictMode>
      <ConfigProvider locale={enUS} theme={themeConfig} >
        <App >
          <Init/>
        </App>
      </ConfigProvider>
    // </StrictMode>
  );
}
