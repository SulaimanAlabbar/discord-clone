import { SET_USERNAME, GET_USERNAME } from "../actions/actions";

const initialState = {
  userId: 123,
  username: "User112233",
  avatar: "https://i.ytimg.com/vi/bNbRyuZ8et8/maxresdefault.jpg",
  servers: [
    {
      name: "server1",
      id: 987,
      icon:
        "https://pmcvariety.files.wordpress.com/2018/05/discord-logo.jpg?w=1000&h=563",
      channels: [
        {
          name: "first",
          id: 2233,
          topic: "Topic of first channel",
          textInput: ""
        },
        {
          name: "second",
          id: 3344,
          topic: "Topic of second channel",
          textInput: ""
        }
      ],
      members: [
        {
          name: "User5566",
          id: 777,
          avatar: "https://i.ytimg.com/vi/bNbRyuZ8et8/maxresdefault.jpg"
        },
        {
          name: "User6677",
          id: 888,
          avatar: "https://i.ytimg.com/vi/bNbRyuZ8et8/maxresdefault.jpg"
        }
      ]
    }
  ],
  activeServerIndex: 0,
  activeChannelsIndices: [1]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state };
    case GET_USERNAME:
      return { ...state };

    default:
      return state;
  }
};
