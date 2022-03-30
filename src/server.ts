
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

let clients: {[index: string]: { 
    x: number, y: number, host: boolean, height: number, width: number 
}} = {};


io.on('connection', ( socket: Socket ) => {

    if( !clients['egg'] ) {
        clients['egg'] = { x: 320, y: 240, height: 20, width: 20, host: false, }
    }

    setInterval(() => {

        let currentObjs = Object.keys(clients)

        if(clients['egg']) {
            //clients['egg'].x++;

            if( clients[ currentObjs[ 1 ] ] ) {
                if( clients[ currentObjs[1] ].x - clients['egg'].x > -20 
                    && clients[ currentObjs[1] ].x - clients['egg'].x < 20 
                        && clients[ currentObjs[1] ].y - clients['egg'].y > -20 
                            && clients[ currentObjs[1] ].y - clients['egg'].y < 20  ) {
                    console.log('touching')
                }
            }

            if( clients['egg'].y > 450 ) {
                clients['egg'].y = 450
            }
            if( clients['egg'].x < 10 ) {
                clients['egg'].x = 10
            }
            if( clients['egg'].y < 10 ) {
                clients['egg'].y = 10
            }
            if( clients['egg'].x > 610 ) {
                clients['egg'].x = 610
            }

            io.emit('position', clients)
        }
    }, 1000/60)
    

    socket.on("move", ( res: { id: string, x: number, y: number, host: boolean }) => {

        if(clients[res.id]) {
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
        }


        io.emit('position', clients);

    })

    socket.on('newClient',  ( clientData ) => {
        clients[socket.id] = clientData;
        socket.emit('registerId', socket.id)

        if(Object.keys(clients).length === 2) {
            clients[ Object.keys(clients)[1]].host = true
        }

        //console.log(clients)
        io.emit('position', clients);
    });

    socket.on('disconnect', () => {

        if(clients[socket.id].host ) {
            clients[ Object.keys(clients)[1] ].host = true
        }

        delete clients[socket.id];

        if( Object.keys(clients).length === 1 ) {
            //console.log(Object.keys(clients)[0])
            delete clients['egg']
        }

        //console.log(clients)
        io.emit('position', clients);
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