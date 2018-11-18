const state = require("./state");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const WebSocket = require("ws");
module.exports = port => {
  const app = express();

  const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({
    storage: storage
  }).single("imageUpload");

  app.use(
    "/public/images/",
    express.static(path.join(__dirname, "public/images/"))
  );

  app.listen(port, () => console.log(`Server started on port ${port}`));

  app.post("/images", (req, res) => {
    upload(req, res, err => {
      const id = req.file.filename.slice(0, req.file.filename.indexOf("_"));
      const indexOfSock = state.sockets.findIndex(sock => sock.id === id);

      if (state.sockets[indexOfSock].serverIcon !== null) {
        fs.unlink(`${state.sockets[indexOfSock].serverIcon}`, err => {
          if (err) throw err;
        });
      }

      state.sockets[indexOfSock] = {
        ...state.sockets[indexOfSock],
        serverIcon: null
      };

      state.sockets[indexOfSock] = {
        ...state.sockets[indexOfSock],
        serverIcon: `public/images/${req.file.filename}`
      };

      state.sockets[indexOfSock].socket.send(
        JSON.stringify({
          action: "SERVERICON_UPLOADED",
          payload: {}
        })
      );

      if (!err) return res.sendStatus(200).end();
    });
  });
};
