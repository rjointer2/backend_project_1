
const _port = process.env.PORT || 1212;

import http from 'http'
import express from "express";
import { Socket } from 'socket.io';
import { init } from './game_engine/init';


const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on('connection', ( socket: Socket ) => init( socket, io ))


server.listen(_port, () => {
    console.log(`server listening`)
})
