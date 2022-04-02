
import { Socket } from "socket.io";
import clients from "../clients";

export default function connectClient( socket: Socket, io: Socket ) {

    socket.on('newClient',  ( clientData ) => {
        clients[socket.id] = clientData;
        socket.emit('registerId', socket.id)

        io.emit('position', clients);
    });
}