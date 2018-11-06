import {
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL,
  SET_INPUTPANEL_TEXT,
  SEND_MESSAGE
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
