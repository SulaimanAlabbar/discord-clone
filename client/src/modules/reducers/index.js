import {
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL,
  SET_INPUTPANEL_TEXT,
  ADD_MESSAGE,
  SET_PAGE,
  SET_SOCKET,
  SET_USER_CONFIG,
  SET_SERVERMODAL_VISIBILITY,
  SET_SERVERMODAL_VIEW,
  SET_INVITEMODAL_VISIBILITY,
  SET_READY_CREATE_SERVER,
  ADD_SERVER,
  SET_MESSAGES_FETCHING_STATUS,
  ADD_FETCHED_MESSAGES
} from "../actions/actions";

const initialState = {
  socket: false,
  loggedIn: false,
  currentPage: "LoadingPage",
  inputtedLoginInfo: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_SERVER:
      return {
        ...state,
        activeServerIndex: action.index,
        smoothScroll: false,
        inviteModalVisible: false
      };
    case SET_ACTIVE_CHANNEL:
      return {
        ...state,
        activeChannelsIndices: [
          ...state.activeChannelsIndices.slice(0, state.activeServerIndex),
          action.index,
          ...state.activeChannelsIndices.slice(state.activeServerIndex + 1)
        ],
        smoothScroll: false
      };
    case SET_INPUTPANEL_TEXT:
      return {
        ...state,
        servers: [
          ...state.servers.slice(0, state.activeServerIndex),
          {
            ...state.servers[state.activeServerIndex],
            channels: [
              ...state.servers[state.activeServerIndex].channels.slice(
                0,
                state.activeChannelsIndices[state.activeServerIndex]
              ),
              {
                ...state.servers[state.activeServerIndex].channels[
                  state.activeChannelsIndices[state.activeServerIndex]
                ],
                inputText: action.text
              },
              ...state.servers[state.activeServerIndex].channels.slice(
                state.activeChannelsIndices[state.activeServerIndex] + 1
              )
            ]
          },
          ...state.servers.slice(state.activeServerIndex + 1)
        ]
      };
    case ADD_MESSAGE:
      return {
        ...state,
        servers: [
          ...state.servers.slice(0, action.serverIndex),
          {
            ...state.servers[action.serverIndex],
            channels: [
              ...state.servers[action.serverIndex].channels.slice(
                0,
                action.channelIndex
              ),
              {
                ...state.servers[action.serverIndex].channels[
                  action.channelIndex
                ],
                messages: [
                  ...state.servers[action.serverIndex].channels[
                    action.channelIndex
                  ].messages,
                  {
                    id: action.message.id,
                    timestamp: action.message.timestamp,
                    content: action.message.content,
                    memberId: action.message.memberId
                  }
                ]
              },
              ...state.servers[action.serverIndex].channels.slice(
                action.channelIndex + 1
              )
            ]
          },
          ...state.servers.slice(action.serverIndex + 1)
        ],
        smoothScroll: true
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.socket
      };
    case SET_USER_CONFIG:
      return {
        ...state,
        ...action.userConfig,
        currentPage: "ServerPage",
        loggedIn: true,
        activeServerIndex: action.activeServerIndex,
        activeChannelsIndices: action.activeChannelsIndices,
        smoothScroll: false,
        serverModalVisible: action.visibility,
        serverModalView: action.view,
        messagesFetchingStatus: action.messagesFetchingStatus,
        messagesFetchingServerIndex: null,
        messagesFetchingChannelIndex: null
      };
    case SET_SERVERMODAL_VISIBILITY:
      return {
        ...state,
        serverModalVisible: action.visibility,
        inviteModalVisible: false
      };
    case SET_SERVERMODAL_VIEW:
      return {
        ...state,
        serverModalView: action.view
      };
    case SET_INVITEMODAL_VISIBILITY:
      return {
        ...state,
        inviteModalVisible: action.visibility,
        serverModalVisible: false
      };
    case SET_READY_CREATE_SERVER:
      return {
        ...state,
        readyCreateServer: action.ready
      };
    case ADD_SERVER:
      return {
        ...state,
        servers: [...state.servers, action.newServer],
        activeChannelsIndices: [...state.activeChannelsIndices, 0],
        smoothScroll: false
      };
    case SET_MESSAGES_FETCHING_STATUS:
      return {
        ...state,
        messagesFetchingStatus: action.status,
        smoothScroll: true,
        messagesFetchingServerIndex: state.activeServerIndex,
        messagesFetchingChannelIndex:
          state.activeChannelsIndices[state.activeServerIndex]
      };
    case ADD_FETCHED_MESSAGES:
      return {
        ...state,
        servers: [
          ...state.servers.slice(0, state.messagesFetchingServerIndex),
          {
            ...state.servers[state.messagesFetchingServerIndex],
            channels: [
              ...state.servers[
                state.messagesFetchingServerIndex
              ].channels.slice(0, state.messagesFetchingChannelIndex),
              {
                ...state.servers[state.messagesFetchingServerIndex].channels[
                  state.messagesFetchingChannelIndex
                ],
                messages: [
                  ...action.messages,
                  ...state.servers[state.messagesFetchingServerIndex].channels[
                    state.messagesFetchingChannelIndex
                  ].messages
                ]
              },
              ...state.servers[
                state.messagesFetchingServerIndex
              ].channels.slice(state.messagesFetchingChannelIndex + 1)
            ]
          },
          ...state.servers.slice(state.messagesFetchingServerIndex + 1)
        ],
        messagesFetchingStatus: false
      };
    default:
      return state;
  }
};
