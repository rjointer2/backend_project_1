
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
    x: number, y: number, host: boolean, height: number, width: number,  dx: number, dy: number
}} = {};


io.on('connection', ( socket: Socket ) => {

    if( !clients['egg'] ) {
        clients['egg'] = { x: 320, y: 240, height: 20, width: 20, host: false, dx: 0, dy: 0 }
    }

    setInterval(() => {

        let currentObjs = Object.keys(clients)

        if(clients['egg']) {

            const prevX = clients['egg'].x
            const prevY = clients['egg'].y

            const newX = prevX+1;
            const newY = clients['egg'].y;

            clients['egg'].x = newX

            //clients['egg'].x++;

            clients['egg'].dx = prevX - newX
            clients['egg'].dy = prevY - newY

            if( clients[ currentObjs[ 1 ] ] ) {
                if( clients[ currentObjs[1] ].x - clients['egg'].x > -20 
                    && clients[ currentObjs[1] ].x - clients['egg'].x < 20 
                        && clients[ currentObjs[1] ].y - clients['egg'].y > -20 
                            && clients[ currentObjs[1] ].y - clients['egg'].y < 20  ) {
                    //console.log('touching')
                }
            }

            if( clients['egg'].y > 470 ) {
                clients['egg'].y = 470
            }
            if( clients['egg'].x < 10 ) {
                clients['egg'].x = 10
            }
            if( clients['egg'].y < 10 ) {
                clients['egg'].y = 10
            }
            if( clients['egg'].x > 630 ) {
                clients['egg'].x = 630
            }

            io.emit('position', clients)
        }
    }, 1000/60)
    

    socket.on("move", ( res: { id: string, x: number, y: number, host: boolean, dx: number, dy: number }) => {


        if(clients[res.id]) {

            const prevX = clients[res.id].x
            const prevY = clients[res.id].y

            const newX = res.x;
            const newY = res.y;

            clients[res.id].x = newX
            clients[res.id].y = newY
            clients[res.id].dx = prevX - newX
            clients[res.id].dy = prevY - newY
            //prevX - newX > 0 ? console.log('left') : console.log('right');
            //prevY - newY > 0 ? console.log('up') : console.log('down');

            console.log(`x_vel: ${prevX - newX}, y_vel: ${prevY - newY}`)


            
            // wall detction 
            if( clients[res.id].y > 470 ) {
                clients[res.id].y = 470
            }
            if( clients[res.id].x < 10 ) {
                clients[res.id].x = 10
            }
            if( clients[res.id].y < 10 ) {
                clients[res.id].y = 10
            }
            if( clients[res.id].x > 630 ) {
                clients[res.id].x = 630
            }

            console.log( 
                clients[res.id].x, 
                clients[res.id].y, 
            )
        }


        io.emit('position', clients);

    })

    socket.on('newClient',  ( clientData ) => {
        clients[socket.id] = clientData;
        socket.emit('registerId', socket.id)



        //console.log(clients)
        io.emit('position', clients);
    });

    socket.on('disconnect', () => {


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



*/