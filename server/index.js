//const http = require("http");
const WebSocket = require("ws");
let { databaseReady } = require("./constants");
const databaseInit = require("./database/databaseInit");
const verifyUser = require("./database/verifyUser");

const port = 5000;

//const server = new http.createServer();

const io = new WebSocket.Server({ port });

//console.log(databaseReady);
//databaseInit();
io.on("connection", socket => {
  console.log("User connected");
  socket.on("message", async userInfo => {
    console.log("USERINFO");
    const userVerified = await verifyUser(JSON.parse(userInfo));
    console.log("ABCD: ", userVerified);
  });
});
//Connect
//Recieve UserInfo
//Check with database
//If checks out, proceed with other events
//If not send invalid
//if disconnect, drop socket

// socket.on("disconnect", function() {
//   console.log("user disconnected");
// });

//socket.emit("setup", "stuff");

//socket.on("sendMessage", message => {
// socket.broadcast.emit("recieveMessage", message);
// });

//on message, but all recieved message would specify in the object
//you're going to parse what to do with the incoming data
//switch statement, if first thing is...etc then, ...etc

// server.listen(port, error => {
//   if (error) throw error;
//   console.log(`listening on port ${port}`);
// });
