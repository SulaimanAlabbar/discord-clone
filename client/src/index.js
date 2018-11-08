import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import reducer from "./modules/reducers";
import Discord from "./discord.jsx";
import initSocket from "./modules/socket/initSocket";

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

initSocket();

// setInterval(() => {
//   console.log(store.getState().socket);
// }, 2000);

// setInterval(() => {
//   if (store.getState().connectionStatus === "disconnected") {
//     console.log("Attempting connection");
//     socket();
//   }
// }, 10000);

//change interval ^

const App = () => (
  <Provider store={store}>
    <Discord />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
