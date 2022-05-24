
import { Socket } from "socket.io";
import clients from "../clientObjects&Functions/clients";

export default function spawnMagicBall( socket: Socket, io: Socket ) {
    if( !clients['magicBall'] ) {
        clients['magicBall'] = { x: 30, y: 30, 
            height: 20, width: 20, host: false, 
            dx: .6, dy: 0, speed: 1, hold: false, 
            heldBy: null, color: 'green',
            xDir: 'right'
        }
    }
}