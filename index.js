const http = require("http");
var fs = require("fs");

var index = fs.readFileSync("index.html");

const reqListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
};

const server = http.createServer(reqListener);

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8080);
