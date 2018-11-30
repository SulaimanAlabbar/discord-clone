//import config from "../../config.json";
import { store } from "../../index";
import * as actionCreators from "../actions";
// const io = new WebSocket(`ws://${config.serverIp}`);
import login from "./serverCom/login";
const socket = new WebSocket(`ws://localhost:5000`);

export default async () => {
  try {
    socket.onopen = async () => {
      console.log("connected to server");
      store.dispatch(actionCreators.setSocket(socket));

      if (localStorage.getItem("loginInfo_id") !== null) {
        login(localStorage.getItem("loginInfo_name"));
      } else {
        store.dispatch(actionCreators.setPage("LoginPage"));
      }

      socket.onmessage = msg => {
        const messageAction = JSON.parse(msg.data).action;
        const messagePayload = JSON.parse(msg.data).payload;

        switch (messageAction) {
          case "LOGIN_FAIL": {
            store.dispatch(actionCreators.setPage("LoginPage"));
            localStorage.clear();
            break;
          }

          case "LOGIN_SUCCESS": {
            store.dispatch(actionCreators.setUserConfig(messagePayload));
            store.dispatch(actionCreators.setPage("ServerPage"));
            console.log(messagePayload);
            localStorage.clear();
            localStorage.setItem("loginInfo_id", messagePayload.id);
            localStorage.setItem("loginInfo_name", messagePayload.name);
            break;
          }

          case "MESSAGE": {
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
          }
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
          case "FETCHED_MESSAGES": {
            console.log("PAYLOAD: ", messagePayload);
            //messageid instead of id
            //const indexOfChannel =
            const fetchedMessages = messagePayload.map(mp => ({
              id: mp.id,
              timestamp: mp.timestamp,
              content: mp.content,
              memberId: mp.memberid
            }));

            store.dispatch(actionCreators.addFetchedMessages(fetchedMessages));
            // store.dispatch(
            //   actionCreators.addFetchedMessages([
            //     {
            //       id: "49d3d8b9-b730-4730-8278-ad75538d6997",
            //       timestamp: "2018-11-19T00:33:52.287Z",
            //       content: "abc",
            //       memberId: "c3aa8fd4-5161-48d8-a7b6-a73a337b3a6d"
            //     }
            //   ])
            // );
            // store.dispatch(actionCreators.setServerModalView("createjoin"));
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
