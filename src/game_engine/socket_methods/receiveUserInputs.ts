
import { Socket } from "socket.io";
import clients from "../clients";

export default function receiveUserInputs( socket: Socket, io: Socket ) {

    let count = 0;
    let hash: { [index: string]: number } = {};



    socket.on('holdEgg', (res: { id: string, hold: boolean }) => {
        if( clients[res.id].x - clients['egg'].x > -40 
                && clients[res.id].x - clients['egg'].x < 40 
                    && clients[res.id].y - clients['egg'].y > -40 
                        && clients[res.id].y - clients['egg'].y < 40  ) {
                            clients['egg'].hold = res.hold  
                            if(!clients['egg'].hold) {
                                clients['egg'].dx = (clients['egg'].x - clients[res.id].x) * ( hash[res.id] / 150 )
                                clients['egg'].dy = (clients['egg'].y - clients[res.id].y) * ( hash[res.id] / 150 )
                                console.log(
                                    'yspeed: ', clients['egg'].dy,
                                    'xsped: ', clients['egg'].dx
                                )
                            } 
                            if( !hash[res.id] ) hash[res.id] = 0;
                            if( hash[res.id] <= 200 ) hash[res.id]++
                            console.log(hash[res.id] )
        } 
        
        
    })

    socket.on('aimEgg', ( res: {
        id: string, mx: number, my: number
    }) => {

        let x = res.mx
        let y = res.my
        let tempY = res.my - clients[res.id].y;
        let tempX = res.mx - clients[res.id].x;

        if( clients[res.id].x - clients['egg'].x >= -40 
            && clients[res.id].x - clients['egg'].x <= 40 
            && clients[res.id].y - clients['egg'].y >= -40 
            && clients[res.id].y - clients['egg'].y <= 40 
        ) {
            if(clients['egg'].hold) {

                if(  tempY >= 38 ) y = clients[res.id].y + 38
                if( tempY <= -38  ) y = clients[res.id].y - 38
        
                if(  tempX >= 38 ) x = clients[res.id].x + 38
                if( tempX <= -38  ) x = clients[res.id].x - 38

                // bottom wall
                if( y > 460 ) y = 460
                // right wall
                if( x < 0 ) x = 0
                // left wall
                if( y < 0 ) y = 0
                // top wall
                if( x > 620 ) x = 620

                clients['egg'].dx = 0;
                clients['egg'].dy = 0;
        
                clients['egg'].y = y
                clients['egg'].x = x
                
            }
                                       
        }
    })

    socket.on("move", ( res: { 
        id: string, 
        direction: { 
            [index: KeyboardEvent['key']]: boolean
        }
        host: boolean, dx: number, dy: number,
        speed: number, hold: boolean
        }
    ) => {


        if(clients[res.id]) {

            if( !res.direction.q ) {
                if( res.direction.ArrowRight || res.direction.d ) clients[res.id].x = clients[res.id].x + 3;
                if( res.direction.ArrowUp || res.direction.w ) clients[res.id].y = clients[res.id].y - 3;
                if( res.direction.ArrowLeft || res.direction.a ) clients[res.id].x = clients[res.id].x - 3;
                if( res.direction.ArrowDown || res.direction.s ) clients[res.id].y = clients[res.id].y + 3;
                clients[res.id].hold = false
            }
        
            // wall detction 
            if( clients[res.id].y > 460 )   clients[res.id].y = 460
            if( clients[res.id].x < 10 )    clients[res.id].x = 10
            if( clients[res.id].y < 10 )    clients[res.id].y = 10
            if( clients[res.id].x > 620 )   clients[res.id].x = 620

        }

        io.emit('position', clients);

    })
}


/* clients[res.id].x = res.x
            clients[res.id].y = res.y */

            /* const prevX = clients[res.id].x
            const prevY = clients[res.id].y

            const newX = res.x;
            const newY = res.y;

            clients[res.id].x = newX
            clients[res.id].y = newY
            clients[res.id].dx = prevX - newX
            clients[res.id].dy = prevY - newY */

            //prevX - newX > 0 ? console.log('left') : console.log('right');
            //prevY - newY > 0 ? console.log('up') : console.log('down');

            //console.log(`x_vel: ${prevX - newX}, y_vel: ${prevY - newY}`)