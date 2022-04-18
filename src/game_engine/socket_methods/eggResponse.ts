
import { Socket } from "socket.io"
import clients from "../clients"

export default function eggResponse( socket: Socket, io: Socket ) {
    setInterval(() => {
        

        if(clients['egg']) {


            // bottom wall
            if( clients['egg'].y > 460 ) clients['egg'].dy = -clients['egg'].dy
            // right wall
            if( clients['egg'].x < 0 ) clients['egg'].dx = -clients['egg'].dx
            // left wall
            if( clients['egg'].y < 0 ) clients['egg'].dy = -clients['egg'].dy
            // top wall
            if( clients['egg'].x > 620 ) clients['egg'].dx = -clients['egg'].dx

            if( !( clients['egg'].dy <= .6 && clients['egg'].dx <= .6  ) ) {
                clients['egg'].dx /= 1.001
                clients['egg'].dy /= 1.001
                console.log(
                    'yspeed: ', clients['egg'].dy,
                    'xsped: ', clients['egg'].dx
                )
            }


            clients['egg'].x += clients['egg'].dx
            clients['egg'].y += clients['egg'].dy

            io.emit('position', clients)
        }
    }, 1000/60)
}