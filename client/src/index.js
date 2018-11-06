import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import reducer from "./modules/reducers";
import Discord from "./discord.jsx";
import Socket from "./modules/socket";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Socket();

const App = () => (
  <Provider store={store}>
    <Discord />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
