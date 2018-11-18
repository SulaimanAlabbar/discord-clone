import { store } from "../../../index";

export default async serverInfo => {
  const { socket } = store.getState();
  try {
    socket.send(JSON.stringify({ action: "JOIN_SERVER", payload: serverInfo }));
  } catch (error) {
    console.error(error);
  }
};
