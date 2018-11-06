import config from "../../config.json";
const io = require("socket.io-client");

export default () => {
  const socket = io.connect(config.serverIp);

  socket.emit("hello", "world");

  socket.on("rara", () => {
    console.log("aaaaa");
  });

  socket.on("response msg", res => {
    console.log(res);
  });
};
