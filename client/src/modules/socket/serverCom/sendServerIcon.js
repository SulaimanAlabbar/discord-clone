import { store } from "../../../index";

export default async serverIcon => {
  const { id, socket } = store.getState();
  try {
    const SI = await getBase64(serverIcon);
    console.log(serverIcon);
    console.log(SI);
    socket.send(
      JSON.stringify({
        action: "SERVERICON",
        payload: { id: id, serverIcon: SI }
      })
    );
  } catch (error) {
    console.error(error);
  }
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}
