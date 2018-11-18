import { store } from "../../../index";

export default async () => {
  const { socket } = store.getState();
  try {
    socket.send(
      JSON.stringify({
        action: "SCJModal",
        payload: {}
      })
    );
  } catch (error) {
    console.error(error);
  }
};
