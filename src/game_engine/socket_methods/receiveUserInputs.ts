
import { Socket } from "socket.io";
import clients from "../clients";

export default function receiveUserInputs( socket: Socket, io: Socket ) {

    socket.on('holdEgg', res => {
        for( let id in clients ) {
            if( !clients[id] ) return false;
            if( id === 'egg' ) continue;
            if( clients[id].x - clients['egg'].x > -40 
                && clients[id].x - clients['egg'].x < 40 
                    && clients[id].y - clients['egg'].y > -40 
                        && clients[id].y - clients['egg'].y < 40  ) {
                            clients['egg'].hold = res.hold    
            }
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
                        && clients[res.id].y - clients['egg'].y <= 40  ) {
                            if(clients['egg'].hold) {

                                if(  tempY >= 40 ) y = clients[res.id].y + 40
                                if( tempY <= -40  ) y = clients[res.id].y - 40
                        
                                if(  tempX >= 40 ) x = clients[res.id].x + 40
                                if( tempX <= -40  ) x = clients[res.id].x - 40
                        
                                clients['egg'].y = y
                                clients['egg'].x = x

                            }
                                
                            
            }
    })

    socket.on("move", ( res: { 
        id: string, 
        direction: { 
            ArrowLeft: boolean, ArrowRight: boolean, 
            ArrowUp: boolean, ArrowDown: boolean,
            Shift: boolean 
        }
        host: boolean, dx: number, dy: number,
        speed: number, hold: boolean
        }
    ) => {


        if(clients[res.id]) {

            if( !res.direction.Shift ) {
                if( res.direction.ArrowRight ) clients[res.id].x = clients[res.id].x + 3;
                if( res.direction.ArrowUp ) clients[res.id].y = clients[res.id].y - 3;
                if( res.direction.ArrowLeft ) clients[res.id].x = clients[res.id].x - 3;
                if( res.direction.ArrowDown ) clients[res.id].y = clients[res.id].y + 3;
                clients[res.id].hold = false
            }

            if( res.direction.Shift ) clients[res.id].hold = true
        
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