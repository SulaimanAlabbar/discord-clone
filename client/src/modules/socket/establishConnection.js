//import config from "../../config.json";
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
          case "SCJModal":
            store.dispatch(actionCreators.setReadyCreateServer(false));
            store.dispatch(actionCreators.setServerModalView("createjoin"));
            break;
          case "SERVERICON_UPLOADED":
            console.log("GOT IT");
            store.dispatch(actionCreators.setReadyCreateServer(true));
            break;
          case "SERVER_CREATED":
            {
              const { activeChannelsIndices } = store.getState();
              console.log("SERVER CREATED");
              console.log(messagePayload);
              store.dispatch(actionCreators.setReadyCreateServer(true));
              store.dispatch(actionCreators.setServerModalVisibility(false));
              store.dispatch(actionCreators.addServer(messagePayload));
              setTimeout(() => {
                store.dispatch(
                  actionCreators.setActiveServer(activeChannelsIndices.length)
                );
              }, 100);
            }
            break;
          case "JOINED_SERVER": {
            const { activeChannelsIndices } = store.getState();
            store.dispatch(actionCreators.setServerModalVisibility(false));
            if (messagePayload === "invalid") {
              console.log("Invalid invite link");
            } else if (messagePayload === "noserver") {
              console.log("Server doesn't exist");
            } else if (messagePayload === "inserver") {
              console.log("Already in server");
            } else {
              store.dispatch(actionCreators.addServer(messagePayload));
              setTimeout(() => {
                store.dispatch(
                  actionCreators.setActiveServer(activeChannelsIndices.length)
                );
              }, 100);
            }
            break;
          }
          default:
            break;
        }
      };
    };
  } catch (error) {
    console.error(error);
  }
};
