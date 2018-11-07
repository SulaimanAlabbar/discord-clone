import config from "../../config.json";
import { store } from "../../index";
import * as actionCreators from "../actions";
const io = require("socket.io-client");

export default async userInfo => {
  try {
    //connect with userinfo?
    console.log(userInfo);
    const socket = await io.connect(config.serverIp);

    socket.on("setup", data => {
      store.dispatch(actionCreators.setSocket(socket));

      console.log(data);

      socket.on("recieveMessage", message => {
        console.log(message);
        store.dispatch(actionCreators.sendMessage(message));
      });
    });
  } catch (error) {
    console.error(error);
  }
};
