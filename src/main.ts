import express from "express";
import SocketIo from "socket.io";
import { Server } from "http";
import path from "path";

const app = express();
const server = new Server(app);
const io = new SocketIo.Server(server);

io.on("connection", (socket) => {
  const client_id = socket.id;
  console.log("server has connected with id: ", client_id);
  socket.on("message", (data) => {
    console.log("receive data:", data);
    io.emit("put-message", data);
  });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

const port = 4000;
server.listen(port, () => {
  console.log("server run at port ", port);
});
