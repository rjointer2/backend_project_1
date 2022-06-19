

import { Socket } from "socket.io";
import clients from "./clients";

export default function disconnectClient( socket: Socket, io: Socket ) {

    socket.on('disconnect', () => {
        delete clients[socket.id];
        
        

    });
}