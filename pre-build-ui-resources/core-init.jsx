import { StrictMode , createRoot } from "@wordpress/element";
import { ConfigProvider, App } from "antd";
import enUS from "antd/locale/en_US"; // Example: English locale

import themeConfig from "./CoreNest/config/themeConfig.json";
import Init from "./CoreNest/Init.jsx";
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
