
import { Socket } from "socket.io"
import clients from "../clients"

export default function eggResponse( socket: Socket, io: Socket ) {
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
}