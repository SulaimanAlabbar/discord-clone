import React from "react";
import { store } from "../index";
import LoadingPage from "../pages/loadingPage";
import ServerPage from "../pages/serverPage";
import LoginPage from "../pages/loginPage";
export default () => {
  const { currentPage } = store.getState();

  if (currentPage === "LoadingPage") return <LoadingPage />;
  else if (currentPage === "LoginPage") return <LoginPage />;
  else if (currentPage === "ServerPage") return <ServerPage />;
};
