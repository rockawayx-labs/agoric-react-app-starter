import "./installSesLockdown";
import "ses";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  AgoricNotifications,
  AgoricWalletProvider,
} from "@rbflabs/agoric-react-components";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AgoricWalletProvider
      dappName="agoric-react-app-starter"
      autoConnect={false}
    >
      <AgoricNotifications />
      <App />
    </AgoricWalletProvider>
  </React.StrictMode>
);
