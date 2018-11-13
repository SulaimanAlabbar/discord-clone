import {
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL,
  SET_INPUTPANEL_TEXT,
  ADD_MESSAGE,
  SET_PAGE,
  SET_SOCKET,
  SET_USER_CONFIG,
  SET_SERVERMODAL_VISIBILITY,
  SET_SERVERMODAL_VIEW
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

export const addMessage = messageInfo => ({
  type: ADD_MESSAGE,
  message: messageInfo.message,
  serverIndex: messageInfo.serverIndex,
  channelIndex: messageInfo.channelIndex
});

export const setPage = page => ({
  type: SET_PAGE,
  page
});

export const setSocket = socket => ({
  type: SET_SOCKET,
  socket: socket
});

export const setUserConfig = userConfig => ({
  type: SET_USER_CONFIG,
  userConfig: userConfig,
  activeServerIndex: 0,
  activeChannelsIndices: new Array(userConfig.servers.length).fill(0),
  serverModalVisible: false,
  serverModalView: ""
});

export const setServerModalVisibility = visibility => ({
  type: SET_SERVERMODAL_VISIBILITY,
  visibility
});

export const setServerModalView = view => ({
  type: SET_SERVERMODAL_VIEW,
  view
});
