import { store } from "../../../index";

export default async serverInfo => {
  const { socket } = store.getState();
  try {
    socket.send(
      JSON.stringify({ action: "CREATE_SERVER", payload: serverInfo })
    );
  } catch (error) {
    console.error(error);
  }
};
