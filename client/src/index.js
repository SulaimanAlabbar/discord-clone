import React from "react";
import ReactDOM from "react-dom";
import Discord from "./discord.jsx";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <Provider store={store}>
    <Discord />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
