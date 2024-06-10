import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "animate.css";

WebApp.backgroundColor = "#000000";
WebApp.headerColor = "#000000";
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <App />
    </Theme>
  </React.StrictMode>
);
