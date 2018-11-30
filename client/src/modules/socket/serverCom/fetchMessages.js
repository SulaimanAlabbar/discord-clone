import { store } from "../../../index";

export default async () => {
  const {
    socket,
    servers,
    activeServerIndex,
    activeChannelsIndices
  } = store.getState();
  try {
    socket.send(
      JSON.stringify({
        action: "FETCH_MESSAGES",
        payload: {
          channelId:
            servers[activeServerIndex].channels[
              activeChannelsIndices[activeServerIndex]
            ].id,
          lastMessageId:
            servers[activeServerIndex].channels[
              activeChannelsIndices[activeServerIndex]
            ].messages[0].id
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
};
