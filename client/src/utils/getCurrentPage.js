import React from "react";
import { store } from "../index";
import Loading from "../pages/loading";
import ServerPage from "../pages/serverPage";
import LoginPage from "../pages/loginPage";
import initSocket from "../modules/socket/initSocket";
export default () => {
  const {
    userId,
    userName,
    avatar,
    connectedToServer,
    currentPage,
    loggedIn,
    socket
  } = store.getState();

  if (!connectedToServer) return <Loading />;
  else if (!loggedIn) return <LoginPage />;
  //dispatch
  else if (loggedIn && !socket)
    initSocket({
      userId: userId,
      userName: userName,
      avatar: avatar
    });
  else if (currentPage === "ServerPage") return <ServerPage />;
};
