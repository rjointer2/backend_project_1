
import { Socket } from "socket.io";
import clients from "../clients";

export default function spawnEgg( socket: Socket, io: Socket ) {
    if( !clients['egg'] ) {
        clients['egg'] = { x: 320, y: 240, 
            height: 20, width: 20, host: false, 
            dx: .3, dy: .3, speed: 1, hold: false
        }
    }
}