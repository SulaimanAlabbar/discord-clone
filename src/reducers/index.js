import {
  SET_USERNAME,
  GET_USERNAME,
  SET_ACTIVE_SERVER,
  SET_ACTIVE_CHANNEL
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
          textInput: ""
        },
        {
          name: "second-channel",
          id: 3344,
          topic: "Topic of second channel",
          textInput: ""
        },
        {
          name: "third-channel",
          id: 4455,
          topic: "Topic of third channel",
          textInput: ""
        }
      ],
      members: [
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
          textInput: ""
        },
        {
          name: "second-channel",
          id: 3344,
          topic: "Topic of second channel",
          textInput: ""
        },
        {
          name: "third-channel",
          id: 4455,
          topic: "Topic of third channel",
          textInput: ""
        },
        {
          name: "fourth-channel",
          id: 44557,
          topic: "Topic of fourth channel",
          textInput: ""
        },
        {
          name: "fifth-channel",
          id: 44558,
          topic: "Topic of fifth channel",
          textInput: ""
        },
        {
          name: "sixth-channel",
          id: 44559,
          topic: "Topic of sixth channel",
          textInput: ""
        }
      ],
      members: [
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
  activeChannelsIndices: [1, 0]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state };
    case GET_USERNAME:
      return { ...state };
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

    default:
      return state;
  }
};
