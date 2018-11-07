import { store } from "../../../index";

export default async message => {
  const { socket } = store.getState();

  try {
    await socket.emit("sendMessage", message);
  } catch (error) {
    console.error(error);
  }
  // const socket = await io.connect(config.serverIp);
  // store.dispatch(actionCreators.setSocket(socket));
};
