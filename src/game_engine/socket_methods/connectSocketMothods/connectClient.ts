
import { Socket } from "socket.io";
import clients from "../../clients";

export default function connectClient( socket: Socket, io: Socket ) {

    socket.on('newClient',  ( clientData ) => {
        clients[socket.id] = clientData;

        console.log(clientData)
        clients[socket.id].color = clientData.color

        if( Object.keys(clients).length === 1 ) {
            console.log('hello')
        }

        socket.emit('registerId', socket.id)

        io.emit('position', clients);
    });
}