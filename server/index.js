const WebSocket = require("ws");
const uuid = require("uuid/v4");
const validator = require("validator");
//const atob = require("atob");
const databaseInit = require("./database/databaseInit");
const verifyUser = require("./database/verifyUser");
const addMessage = require("./database/addMessage");
const createServer = require("./database/createServer");
const joinServer = require("./database/joinServer");
const state = require("./state");
const expressPort = 4000;
const wsPort = 5000;
const es = require("./express");

es(expressPort);

const atob = str => Buffer.from(str, "base64").toString("binary");

const io = new WebSocket.Server({ port: wsPort });

//console.log(state.databaseReady);
//databaseInit();

try {
  io.on("connection", socket => {
    console.log("User connected");
    state.sockets.push({
      socket: socket
    });

    socket.on("close", () => {
      console.log("USER DISCONNECTED");
      const indexOfSock = state.sockets.findIndex(
        sock => sock.socket === socket
      );
      state.sockets = [
        ...state.sockets.slice(0, indexOfSock),
        ...state.sockets.slice(indexOfSock + 1)
      ];
    });

    socket.on("message", async msg => {
      const messageAction = JSON.parse(msg).action;
      const messagePayload = JSON.parse(msg).payload;

      switch (messageAction) {
        case "LOGIN": {
          const userVerified = await verifyUser(messagePayload);

          if (!userVerified) {
            socket.send(
              JSON.stringify({
                action: "LOGIN_FAIL",
                payload: {}
              })
            );
          } else {
            const indexOfSock = state.sockets.findIndex(
              sock => sock.socket === socket
            );
            state.sockets[indexOfSock] = {
              ...state.sockets[indexOfSock],
              id: userVerified.id,
              servers: userVerified.servers.map(server => server.id),
              serverIcon: null
            };
            socket.send(
              JSON.stringify({
                action: "LOGIN_SUCCESS",
                payload: userVerified
              })
            );
          }
          break;
        }

        case "MESSAGE": {
          console.log(messagePayload);
          const message = await addMessage(messagePayload);
          state.sockets.forEach(sock => {
            if (sock.servers.includes(messagePayload.serverId)) {
              sock.socket.send(
                JSON.stringify({
                  action: "MESSAGE",
                  payload: message
                })
              );
            }
          });
          break;
        }
        case "JOIN_SERVER": {
          const indexOfSock = state.sockets.findIndex(
            sock => sock.socket === socket
          );

          console.log("something");
          if (!validator.isUUID(messagePayload.inviteLink, 4)) {
            console.log("NOT UUID");
            socket.send(
              JSON.stringify({
                action: "JOINED_SERVER",
                payload: "invalid"
              })
            );
          } else {
            const newServer = await joinServer({
              serverId: messagePayload.inviteLink,
              memberId: messagePayload.memberId
            });

            socket.send(
              JSON.stringify({
                action: "JOINED_SERVER",
                payload: newServer
              })
            );
          }
          break;
        }
        case "SERVERICON": {
          console.log("ARRIVED SERVER ICON");
          console.log(atob(messagePayload.serverIcon));
          break;
        }
        case "SCJModal": {
          const indexOfSock = state.sockets.findIndex(
            sock => sock.socket === socket
          );

          state.sockets[indexOfSock] = {
            ...state.sockets[indexOfSock],
            serverIcon: null
          };

          socket.send(
            JSON.stringify({
              action: "SCJModal",
              payload: {}
            })
          );

          break;
        }
        case "CREATE_SERVER": {
          console.log(messagePayload);
          const indexOfSock = state.sockets.findIndex(
            sock => sock.socket === socket
          );

          const newServer = await createServer({
            name: messagePayload.serverName,
            icon: state.sockets[indexOfSock].serverIcon,
            memberId: messagePayload.memberId
          });

          state.sockets[indexOfSock] = {
            ...state.sockets[indexOfSock],
            servers: [...state.sockets[indexOfSock].servers, newServer.id]
          };

          socket.send(
            JSON.stringify({
              action: "SERVER_CREATED",
              payload: newServer
            })
          );

          break;
        }
        default:
          break;
      }
    });
  });
} catch (error) {
  console.error(error);
}
