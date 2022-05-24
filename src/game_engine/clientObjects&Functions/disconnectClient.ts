
import { Socket } from "socket.io";
import clients from "./clients";

export default function disconnectClient( socket: Socket, io: Socket ) {

    socket.on('disconnect', () => {
        delete clients[socket.id];

        if( Object.keys(clients).length === 1 ) {
            delete clients['magicBall']
        }

        io.emit('position', clients);
    });
}