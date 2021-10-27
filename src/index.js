import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Notification from "rc-notification";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { changed } from "./features/valueSetter/valueSetterSlice";
import worker from "workerize-loader!./worker"; // eslint-disable-line import/no-webpack-loader-syntax
import { fibonacci } from "./helpers.js";
import "rc-notification/assets/index.css";

const workerInstance = worker();

const ws = new WebSocket("ws://localhost:9000");
ws.onopen = () => console.log("opened WS");
ws.onmessage = (e) => handleMessage(e);

// This is an example of handling message and some kind of calc expensive operation (fibonacci just for example)
//
// WITH worker
const setValue = ({ value }) => {
  workerInstance
    .fibonacciWorkerized(value)
    .then((res) => store.dispatch(changed(res)));
};
//
// WITHOUT worker
const setBlockingValue = ({ value }) => {
  const res = fibonacci(value); // imagine expensive operation with redux action payload ;)
  store.dispatch(changed(res));
};
//

export const handleMessage = (e) => {
  const data = JSON.parse(e.data);
  const { type } = data;

  switch (type) {
    case "info":
      Notification.newInstance({style: {'top': 10, 'right': 10}}, (notification) => {
        notification.notice({
          content: data.message,
        });
      });
      break;
    case "set_value":
      console.log('New WS message: ', data.value)
      setValue(data);
      break;
    case "set_value_blocking":
      setBlockingValue(data);
      break;
    default:
      break;
  }
};

export const getMessages = () => {
  ws.send(JSON.stringify({ type: "get_queued_messages" }));
};

export const getBlockingMessages = () => {
  ws.send(JSON.stringify({ type: "get_queued_messages_blocking" }));
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
