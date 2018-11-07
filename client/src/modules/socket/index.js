import config from "../../config.json";
import { store } from "../../index";
import * as actionCreators from "../actions";
const io = require("socket.io-client");

export default async () => {
  try {
  } catch (error) {}

  // socket.on("connection", () => {
  //   console.log("cccc");
  //   console.log(socket.connected);
  // });
  // socket.emit("connect", () => {
  //   console.log("cccc");
  //   console.log(socket.connected);
  // });

  //   socket.on("connected", () => {
  //     console.log("mmmmm");
  //     console.log(socket.connected);
  //   });

  //   if (socket.disconnected) {
  //     socket.disconnect();
  //     throw "Couldn't connect to server";
  //   }

  //   socket.on("connection", socket => {
  //     console.log("zzzz");
  //     store.dispatch(actionCreators.setConnectionStatus("connected"));
  //     console.log("Connected successfully to server");
  //   });
  // } catch (error) {
  //   store.dispatch(actionCreators.setConnectionStatus("disconnected"));
  //   console.error(error);
  // }
};

//handle connection loss
