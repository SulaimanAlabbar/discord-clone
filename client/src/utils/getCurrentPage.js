import React from "react";
import { store } from "../index";
import Loading from "../pages/loading";
import ServerPage from "../pages/serverPage";
import LoginPage from "../pages/loginPage";
export default () => {
  const { currentPage } = store.getState();

  if (currentPage === "Loading") return <Loading />;
  else if (currentPage === "LoginPage") return <LoginPage />;
  else if (currentPage === "ServerPage") return <ServerPage />;
};
