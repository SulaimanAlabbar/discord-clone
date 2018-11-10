import config from "../../config.json";
import { store } from "../../index";
import * as actionCreators from "../actions";
import { eventEmitter } from "../../constants";
const EventEmitter = require("eventemitter3");
const socket = new WebSocket(`ws://localhost:5000`);
// const io = new WebSocket(`ws://${config.serverIp}`);

export default async () => {
  try {
    //connect with userinfo?
    socket.onopen = () => {
      console.log("connected to server");
      store.dispatch(actionCreators.setConnectionStatus(true));
      store.dispatch(actionCreators.setPage("LoginPage"));

      eventEmitter.on("inputtedUserInfo", userInfo => {
        socket.send(JSON.stringify(userInfo));
      });
    };

    //socket.on("setup", data => {
    // store.dispatch(actionCreators.setSocket(socket));

    // console.log(data);

    //socket.on("recieveMessage", message => {
    // console.log(message);
    //  store.dispatch(actionCreators.sendMessage(message));
    // });
    //});
  } catch (error) {
    console.error(error);
  }
};
