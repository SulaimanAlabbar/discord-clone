import config from "../../config.json";
import { store } from "../../index";
import * as actionCreators from "../actions";
const socket = new WebSocket(`ws://localhost:5000`);
// const io = new WebSocket(`ws://${config.serverIp}`);

export default async () => {
  try {
    socket.onopen = () => {
      console.log("connected to server");
      store.dispatch(actionCreators.setSocket(socket));
      store.dispatch(actionCreators.setPage("LoginPage"));

      socket.onmessage = msg => {
        const messageAction = JSON.parse(msg.data).action;
        const messagePayload = JSON.parse(msg.data).payload;

        switch (messageAction) {
          case "LOGIN_FAIL":
            break;

          case "LOGIN_SUCCESS":
            store.dispatch(actionCreators.setUserConfig(messagePayload));
            store.dispatch(actionCreators.setPage("ServerPage"));
            break;

          case "MESSAGE":
            const { servers } = store.getState();
            let serverIndex, channelIndex;

            servers.forEach((server, srvIndex) =>
              server.channels.forEach((channel, chIndex) => {
                if (channel.id === messagePayload.channelId) {
                  serverIndex = srvIndex;
                  channelIndex = chIndex;
                }
              })
            );

            store.dispatch(
              actionCreators.addMessage({
                message: {
                  id: messagePayload.id,
                  timestamp: messagePayload.timestamp,
                  content: messagePayload.content,
                  memberId: messagePayload.memberId
                },
                serverIndex: serverIndex,
                channelIndex: channelIndex
              })
            );

            break;
          default:
            break;
        }
      };

      // //put this somewhere else, maybe seperate file
      // eventEmitter.on("inputtedUserInfo", userInfo => {
      //   socket.send(JSON.stringify({ action: "LOGIN", payload: userInfo }));
      // });
    };
  } catch (error) {
    console.error(error);
  }
};
