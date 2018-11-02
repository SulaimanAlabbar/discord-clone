import {
  SET_USERNAME,
  GET_USERNAME,
  GET_SERVERNAME,
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL
} from "./actions";

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
export const setActiveServer = index => ({
  type: SET_ACTIVE_SERVER,
  index
});
export const setActiveChannel = index => ({
  type: SET_ACTIVE_CHANNEL,
  index
});
