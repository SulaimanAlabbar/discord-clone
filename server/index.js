const server = require("http").createServer();
const io = require("socket.io")(server);
let { databaseReady } = require("./constants");
const databaseInit = require("./database/databaseInit");

//console.log(databaseReady);
const port = 5000;
//databaseInit();

io.on("connection", socket => {
  console.log("a user connected");
  //console.log(socket);

  socket.emit("connected");
  console.log("CONNECTED");

  socket.on("userInfo", userInfo => {
    console.log("USERINFO");
    console.log(userInfo);
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
});

server.listen(port, function(err) {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});
