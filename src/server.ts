
const _port = process.env.PORT || 1212;

import http from 'http'
import express from "express";
import { Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let clients: {[index: string]: { x: number, y: number }} = {};

io.on('connection', ( socket: Socket ) => {

    socket.on("move", ( res: { id: string, x: number, y: number }) => {

        console.log(res.x)

        if( clients[res.id] ) {
            clients[res.id].x = res.x
            clients[res.id].y = res.y
        }
        
        // wall detction 
        if( clients[res.id].y > 450 ) {
            clients[res.id].y = 450
        }
        if( clients[res.id].x < 10 ) {
            clients[res.id].x = 10
        }
        if( clients[res.id].y < 10 ) {
            clients[res.id].y = 10
        }
        if( clients[res.id].x > 610 ) {
            clients[res.id].x = 610
        }


        io.emit('position', clients);

    })

    socket.on('newClient',  ( clientData ) => {
        clients[socket.id] = clientData;
        console.log(clients)
        //io.emit('currentClients', clients);
        socket.emit('registerId', socket.id)
        io.emit('position', clients);
    });

    socket.on('disconnect', () => {
        delete clients[socket.id];
        console.log(clients)
        io.emit('position', clients);
        //io.emit('currentClients', clients)
    });

})

server.listen(_port, () => {
    console.log(`server listening`)
})


/* 



socket.on("move", ( res: { id: string, keyCode: number, type: string } ) => {

        console.log(res)
        
        // key state 
        let left = false;
        let up = false;
        let right = false;
        let down = false;

        let keyState = res.type === "keydown" ? true : false;

        if( res.keyCode === 37 ) {
            left = keyState;
            clients[res.id].x--
        }
        if( res.keyCode === 38 ) {
            up = keyState;
            clients[res.id].y--
        }
        if( res.keyCode === 39 ) {
            right = keyState;
            clients[res.id].x++
        }
        if( res.keyCode === 40 ) {
            down = keyState;
            clients[res.id].y++
        }
        


        io.emit('position', clients);

    })




*/