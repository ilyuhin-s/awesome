import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import { Theme } from "@radix-ui/themes";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "@radix-ui/themes/styles.css";

WebApp.backgroundColor = "#000000";
WebApp.headerColor = "#000000";
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <TonConnectUIProvider manifestUrl="https://ilyuhin-s.github.io/awesome/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </Theme>
  </React.StrictMode>
);
