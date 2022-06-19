
const _port = process.env.PORT || 1212;

import  express from "express";
import * as path from "path";
import { Socket } from "socket.io";
import initSocket from "./socketConnectionMethods/initSocket";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});



io.on("connection", ( socket: Socket ) =>  {
  initSocket( socket, io )
});

const server = http.listen(_port, function() {
  
});
