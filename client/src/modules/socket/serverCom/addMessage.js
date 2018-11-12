import { store } from "../../../index";

export default async message => {
  const { socket } = store.getState();
  try {
    socket.send(JSON.stringify({ action: "MESSAGE", payload: message }));
  } catch (error) {
    console.error(error);
  }
};
