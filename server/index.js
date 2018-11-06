const server = require("http").createServer();
const io = require("socket.io")(server);
let { databaseReady } = require("./constants");
const databaseInit = require("./database/databaseInit");

//console.log(databaseReady);
const port = 5000;
//databaseInit();

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("foo", () => {
    console.log("bar");
  });
  socket.on("hello", () => {
    console.log("recieved message, gffhtr.");
    socket.emit("response msg", 123);
  });
});

server.listen(port, function(err) {
  if (err) throw err;
  console.log(`listening on port ${port}`);
});
