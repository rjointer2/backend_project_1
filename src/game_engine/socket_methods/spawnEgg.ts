
import { Socket } from "socket.io";
import clients from "../clients";

export default function spawnEgg( socket: Socket, io: Socket ) {
    if( !clients['egg'] ) {
        clients['egg'] = { x: 30, y: 30, 
            height: 20, width: 20, host: false, 
            dx: .6, dy: 0, speed: 1, hold: false, heldBy: null
        }
    }
}