import { SET_USERNAME, GET_USERNAME, GET_SERVERNAME } from "./actions";

export const setUsername = username => ({
  type: SET_USERNAME,
  username
});
export const getUsername = username => ({
  type: GET_USERNAME,
  username
});
export const getServerName = servername => ({
  type: GET_SERVERNAME,
  servername
});
