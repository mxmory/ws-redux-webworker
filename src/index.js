import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import Notification from "rc-notification";
import "rc-notification/assets/index.css";

const ws = new WebSocket("ws://localhost:9000");

ws.onopen = () => console.log("opened WS");

ws.onmessage = (e) => handleMessage(e);

export const getMessages = () => {
  ws.send(JSON.stringify({ type: "get_queued_messages" }));
};

const setValue = (data) => {
  const { value } = data;
  console.log(value);
};

const handleMessage = (e) => {
  const data = JSON.parse(e.data);
  const { type } = data;
  switch (type) {
    case "info":
      Notification.newInstance({}, (notification) => {
        notification.notice({
          content: data.message,
        });
      });
      break;
    case "set_value":
      setValue(data);
      break;
    default:
      break;
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
