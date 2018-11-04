import {
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL,
  SET_INPUTPANEL_TEXT,
  SEND_MESSAGE
} from "../actions/actions";

const initialState = {
  userId: 123,
  username: "User112233",
  avatar: "https://i.imgur.com/L8RLq3o.jpg",
  servers: [
    {
      name: "server1",
      id: 987,
      icon:
        "http://www.jmkxyy.com/discord-server-icon-maker/discord-server-icon-maker-5.jpg",
      channels: [
        {
          name: "first-channel",
          id: 2233,
          topic: "Topic of first channel",
          inputText: "",
          messages: [
            {
              authorId: 777,
              timestamp: "2018-11-03T14:06:27.818Z",
              content: "Hello"
            },
            {
              authorId: 888,
              timestamp: "2018-11-03T14:24:15.883Z",
              content: "Hey"
            }
          ]
        },
        {
          name: "second-channel",
          id: 3344,
          topic: "Topic of second channel",
          inputText: "",
          messages: [
            {
              authorId: 888,
              timestamp: "2018-11-03T14:24:15.883Z",
              content: "abcdefg"
            }
          ]
        },
        {
          name: "third-channel",
          id: 4455,
          topic: "Topic of third channel",
          inputText: "",
          messages: [
            {
              authorId: 777,
              timestamp: "2018-11-03T14:06:27.818Z",
              content: "123456789"
            }
          ]
        }
      ],
      members: [
        {
          name: "User112233",
          id: 123,
          avatar: "https://i.imgur.com/L8RLq3o.jpg"
        },
        {
          name: "User5566",
          id: 777,
          avatar: "https://i.imgur.com/l4wnhCz.png"
        },
        {
          name: "User6677",
          id: 888,
          avatar: "https://i.imgur.com/iyXex3F.png"
        }
      ]
    },
    {
      name: "server2",
      id: 5672,
      icon:
        "http://chittagongit.com//images/discord-chat-icon/discord-chat-icon-7.jpg",
      channels: [
        {
          name: "first-channel",
          id: 2233,
          topic: "Topic of first channel",
          inputText: "",
          messages: []
        },
        {
          name: "second-channel",
          id: 3344,
          topic: "Topic of second channel",
          inputText: "",
          messages: []
        }
      ],
      members: [
        {
          name: "User112233",
          id: 123,
          avatar: "https://i.imgur.com/L8RLq3o.jpg"
        },
        {
          name: "User6677",
          id: 998,
          avatar: "https://i.imgur.com/HnTWfFc.png"
        },
        {
          name: "User7788",
          id: 678,
          avatar: "https://i.imgur.com/RgNEyri.png"
        },
        {
          name: "User8899",
          id: 7892,
          avatar: "https://i.imgur.com/LZLjB5v.png"
        }
      ]
    }
  ],
  activeServerIndex: 0,
  activeChannelsIndices: [0, 1]
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
                    authorId: action.message.authorId,
                    timestamp: action.message.timestamp,
                    content: action.message.content
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

    default:
      return state;
  }
};
