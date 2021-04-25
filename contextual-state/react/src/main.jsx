// @ts-check

import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { TasksProvider } from "./TaskContext";

ReactDOM.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
