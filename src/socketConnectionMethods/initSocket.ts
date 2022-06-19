
import { Socket } from "socket.io";
import createRoom from "./createRoom";
import { rooms } from "./rooms";



// socket action types
import { $$disconnectFromRoom, $$joinRoom, $$redirect, $$updateRooms } from "./socketEventTypes";

export default function initSocket( socket: Socket & { id: string }, io: Socket ) {

    createRoom( socket, io )

    socket.on($$joinRoom, ( roomName ) => {
        if( roomName in rooms === false) {
            socket.emit($$redirect, 'fallback');
            return;
        }
        socket.join(roomName)
    })

    socket.on($$updateRooms, ( roomName, actionType, data ) => {
        io.to(roomName).emit(actionType, { [socket.id]: data })
    });

}