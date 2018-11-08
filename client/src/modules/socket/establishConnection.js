import config from "../../config.json";
import { store } from "../../index";
import * as actionCreators from "../actions";
import { eventEmitter } from "../../constants";
const io = require("socket.io-client");
const EventEmitter = require("eventemitter3");

export default async () => {
  try {
    //connect with userinfo?
    const socket = await io.connect(config.serverIp);

    socket.on("connected", () => {
      store.dispatch(actionCreators.setConnectionStatus(true));
      store.dispatch(actionCreators.setPage("LoginPage"));
      //new eventEmitter every connection, change this.
      //let evnt = new EventEmitter();

      console.log("connected successfully");

      eventEmitter.on("inputtedUserInfo", userInfo => {
        socket.emit("userInfo", userInfo);
      });
    });

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
