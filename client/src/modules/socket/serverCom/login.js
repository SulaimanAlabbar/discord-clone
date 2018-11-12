import { store } from "../../../index";
import * as actionCreators from "../../actions";

export default async name => {
  try {
    const { socket } = store.getState();

    store.dispatch(actionCreators.setPage("Loading"));
    socket.send(JSON.stringify({ action: "LOGIN", payload: { name: name } }));
  } catch (error) {
    console.error(error);
  }
};
