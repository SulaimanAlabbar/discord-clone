import {
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL,
  SET_INPUTPANEL_TEXT,
  SEND_MESSAGE,
  SET_CONNECTION_STATUS,
  SET_PAGE,
  SET_SOCKET,
  LOGIN
} from "./actions";

export const setActiveServer = index => ({
  type: SET_ACTIVE_SERVER,
  index
});
export const setActiveChannel = index => ({
  type: SET_ACTIVE_CHANNEL,
  index
});
export const setInputPanelText = text => ({
  type: SET_INPUTPANEL_TEXT,
  text
});
export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
});
export const setConnectionStatus = status => ({
  type: SET_CONNECTION_STATUS,
  status
});
export const setPage = page => ({
  type: SET_PAGE,
  page
});
export const setSocket = socket => ({
  type: SET_SOCKET,
  socket
});
export const login = loginInfo => ({
  type: LOGIN,
  loginInfo
});
