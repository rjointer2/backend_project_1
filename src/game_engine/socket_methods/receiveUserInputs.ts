
import { Socket } from "socket.io";
import clients from "../clients";

export default function receiveUserInputs( socket: Socket, io: Socket ) {

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
}