//const http = require("http");
const WebSocket = require("ws");
const uuid = require("uuid/v4");
let { databaseReady } = require("./constants");
const databaseInit = require("./database/databaseInit");
const verifyUser = require("./database/verifyUser");
const addMessage = require("./database/addMessage");
const port = 5000;

//const server = new http.createServer();

const io = new WebSocket.Server({ port });

//console.log(databaseReady);
//databaseInit();

let sockets = [];
try {
  io.on("connection", socket => {
    console.log("User connected");
    sockets.push({
      socket: socket,
      servers: []
    });

    socket.on("close", () => {
      console.log("USER DISCONNECTED");
      const indexOfSock = sockets.findIndex(sock => sock.socket === socket);
      sockets = [
        ...sockets.slice(0, indexOfSock),
        ...sockets.slice(indexOfSock + 1)
      ];
    });

    socket.on("message", async msg => {
      const messageAction = JSON.parse(msg).action;
      const messagePayload = JSON.parse(msg).payload;

      switch (messageAction) {
        case "LOGIN":
          const userVerified = await verifyUser(messagePayload);

          if (!userVerified) {
            socket.send(
              JSON.stringify({
                action: "LOGIN_FAIL",
                payload: {}
              })
            );
          } else {
            const indexOfSock = sockets.findIndex(
              sock => sock.socket === socket
            );
            sockets[indexOfSock] = {
              ...sockets[indexOfSock],
              servers: userVerified.servers.map(server => server.id)
            };
            socket.send(
              JSON.stringify({
                action: "LOGIN_SUCCESS",
                payload: userVerified
              })
            );
          }
          break;

        case "MESSAGE":
          const message = await addMessage(messagePayload);
          sockets.forEach(sock => {
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
        default:
          break;
      }
    });
  });
} catch (error) {
  console.error(error);
}
