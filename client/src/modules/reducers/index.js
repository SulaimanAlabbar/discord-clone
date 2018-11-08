import {
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL,
  SET_INPUTPANEL_TEXT,
  SEND_MESSAGE,
  SET_CONNECTION_STATUS,
  SET_PAGE,
  SET_SOCKET,
  LOGIN
} from "../actions/actions";

const initialState = {
  userId: "c3aa8fd4-5161-48d8-a7b6-a73a337b3a6d",
  userName: "User112233",
  avatar: "https://i.imgur.com/L8RLq3o.jpg",
  servers: [
    {
      name: "server1",
      id: 987,
      icon: "https://i.imgur.com/3XzFlxU.png",
      channels: [
        {
          id: "e4588018-f901-4a15-98d5-491b7576589c",
          name: "first-channel",
          topic: "Topic of first channel",
          inputText: "",
          messages: [
            {
              id: "db876e70-96a3-455d-84da-da936810f967",
              timestamp: "2018-11-03T14:06:27.818Z",
              content: "Hello",
              memberId: "eab683ec-551a-4a35-a75b-9bda5f5da77c"
            },
            {
              id: "f5e9392f-2aa0-4004-a9df-fc79da9b93e6",
              timestamp: "2018-11-03T14:24:15.883Z",
              content: "Hey",
              memberId: "12c23909-9b4e-4e56-a4b7-ea78f697a8c3"
            }
          ]
        },
        {
          id: "39c4ca90-9ecf-4970-bf92-c341d0017f1d",
          name: "second-channel",
          topic: "Topic of second channel",
          inputText: "",
          messages: [
            {
              id: "cda30c3d-96f0-47eb-a8f0-2761e636d92d",
              timestamp: "2018-11-03T14:24:15.883Z",
              content: "abcdefg",
              memberId: "eab683ec-551a-4a35-a75b-9bda5f5da77c"
            }
          ]
        },
        {
          id: "b68207e8-67ab-489a-92d7-7191f81adf02",
          name: "third-channel",
          topic: "Topic of third channel",
          inputText: "",
          messages: [
            {
              id: "b8de35a0-0b21-4c0d-b8bd-92083355ca96",
              timestamp: "2018-11-03T14:06:27.818Z",
              content: "123456789",
              memberId: "12c23909-9b4e-4e56-a4b7-ea78f697a8c3"
            }
          ]
        }
      ],
      members: [
        {
          id: "c3aa8fd4-5161-48d8-a7b6-a73a337b3a6d",
          name: "User112233",
          avatar: "https://i.imgur.com/L8RLq3o.jpg"
        },
        {
          id: "eab683ec-551a-4a35-a75b-9bda5f5da77c",
          name: "User5566",
          avatar: "https://i.imgur.com/l4wnhCz.png"
        },
        {
          id: "12c23909-9b4e-4e56-a4b7-ea78f697a8c3",
          name: "User6677",
          avatar: "https://i.imgur.com/iyXex3F.png"
        }
      ]
    },
    {
      name: "server2",
      id: 5672,
      icon: "https://i.imgur.com/7kBg3tL.png",
      channels: [
        {
          id: "c028b1ae-08cf-4f9c-bce7-18a01626558e",
          name: "first-channel",
          topic: "Topic of first channel",
          inputText: "",
          messages: []
        },
        {
          id: "06bfd645-5bfb-4690-8624-b45d23aa75bc",
          name: "second-channel",
          topic: "Topic of second channel",
          inputText: "",
          messages: []
        }
      ],
      members: [
        {
          id: "c3aa8fd4-5161-48d8-a7b6-a73a337b3a6d",
          name: "User112233",
          avatar: "https://i.imgur.com/L8RLq3o.jpg"
        },
        {
          id: "d38b1b0e-1cde-48ef-9e5b-293b8cda087f",
          name: "User6767",
          avatar: "https://i.imgur.com/HnTWfFc.png"
        },
        {
          id: "80c59215-d22f-49ba-ae0e-ce5ed93858c1",
          name: "User7788",
          avatar: "https://i.imgur.com/RgNEyri.png"
        },
        {
          id: "d4ae2772-e21c-4699-ba0d-69f6db3332bc",
          name: "User8899",
          avatar: "https://i.imgur.com/LZLjB5v.png"
        }
      ]
    }
  ],
  socket: false,
  connectedToServer: false,
  //connectedToServer: false, change back to this
  loggedIn: false,
  currentPage: "Loading",
  activeServerIndex: 0,
  activeChannelsIndices: [0, 1],
  inputtedLoginInfo: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_SERVER:
      return {
        ...state,
        activeServerIndex: action.index
      };
    case SET_ACTIVE_CHANNEL:
      return {
        ...state,
        activeChannelsIndices: [
          ...state.activeChannelsIndices.slice(0, state.activeServerIndex),
          action.index,
          ...state.activeChannelsIndices.slice(state.activeServerIndex + 1)
        ]
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
    case SEND_MESSAGE:
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
                messages: [
                  ...state.servers[state.activeServerIndex].channels[
                    state.activeChannelsIndices[state.activeServerIndex]
                  ].messages,
                  {
                    id: action.message.id,
                    timestamp: action.message.timestamp,
                    content: action.message.content,
                    memberId: action.message.memberId
                  }
                ]
              },
              ...state.servers[state.activeServerIndex].channels.slice(
                state.activeChannelsIndices[state.activeServerIndex] + 1
              )
            ]
          },
          ...state.servers.slice(state.activeServerIndex + 1)
        ]
      };
    case SET_CONNECTION_STATUS:
      return {
        ...state,
        connectedToServer: action.status
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
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        userId: action.loginInfo.userId,
        userName: action.loginInfo.userName,
        avatar: action.loginInfo.avatar,
        currentPage: "ServerPage"
      };

    default:
      return state;
  }
};
