// import { store } from "../../index";
// import * as actionCreators from "../actions";

// export default () => {
//   setInterval(() => {
//     const { socket, connectedToServer } = store.getState();
//     if (socket.connected && !connectedToServer)
//       store.dispatch(actionCreators.setConnectionStatus(true));
//     else if (socket.disconnected && connectedToServer)
//       store.dispatch(actionCreators.setConnectionStatus(false));
//   }, 2000);
// };
