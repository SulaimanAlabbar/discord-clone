import establishConnection from "./establishConnection";
import socketUpdate from "./socketUpdate";

export default userInfo => {
  establishConnection(userInfo);
  //socketUpdate();
};
