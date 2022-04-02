
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
    x: number, y: number, host: boolean, 
    height: number, width: number,  
    dx: number, dy: number, speed: number,
    hold: boolean
}} = {};

/* 

    dx = 1 * clients['egg'].speed
    client's speed // 0 <= starting speed

*/


io.on('connection', ( socket: Socket ) => {

    if( !clients['egg'] ) {
        clients['egg'] = { x: 320, y: 240, 
            height: 20, width: 20, host: false, 
            dx: .3, dy: .3, speed: 1, hold: false
        }
    }

    setInterval(() => {

        let currentObjs = Object.keys(clients)

        if(clients['egg']) {

            if( clients[ currentObjs[ 1 ] ] ) {
                if( clients[ currentObjs[1] ].x - clients['egg'].x >= -20 
                    && clients[ currentObjs[1] ].x - clients['egg'].x <= 20 
                        && clients[ currentObjs[1] ].y - clients['egg'].y >= -20 
                            && clients[ currentObjs[1] ].y - clients['egg'].y <= 20  ) {
                        
                       if( clients[ currentObjs[ 1 ] ].hold ) {
                        console.log('holding')
                        clients['egg'].x = clients['egg'].x
                        io.emit('position', clients)
                        return false
                       }
                    // collision
                    /* clients['egg'].dx = -clients[ currentObjs[ 1 ] ].dx * .9;
                    clients['egg'].dy = -clients[ currentObjs[ 1 ] ].dy * .9; */
                }
            }

            // bottom wall
            if( clients['egg'].y > 470 ) clients['egg'].dy = -clients['egg'].dy
            // right wall
            if( clients['egg'].x < 10 ) clients['egg'].dx = -clients['egg'].dx
            // left wall
            if( clients['egg'].y < 10 ) clients['egg'].dy = -clients['egg'].dy
            // top wall
            if( clients['egg'].x > 630 ) clients['egg'].dx = -clients['egg'].dx

            clients['egg'].x += clients['egg'].dx
            clients['egg'].y += clients['egg'].dy

            io.emit('position', clients)
        }
    }, 1000/60)
    

    socket.on("move", ( res: { 
        id: string, x: number, y: number, 
        host: boolean, dx: number, dy: number,
        speed: number, hold: boolean
        }
    ) => {


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

            //console.log(`x_vel: ${prevX - newX}, y_vel: ${prevY - newY}`)

            clients[res.id].hold = res.hold


            
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

            console.log(clients[res.id].hold)
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