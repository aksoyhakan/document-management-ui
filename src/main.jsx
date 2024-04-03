import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { lightTheme } from "./themes";
import ToastProvider from "./components/toast/provider";

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={lightTheme}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);
