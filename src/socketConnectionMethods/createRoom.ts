
import { Socket } from "socket.io";
import { rooms } from "./rooms";
import { $$roomCreated } from "./socketEventTypes";


// socket evemt types


interface ServerToClientEvents {
    sendResponse: () => {}
  }

/* 

    sendResponse is general 

*/

export default function createRoom( socket: Socket, io: Socket ) {

    socket.on('createRoom', ( roomName: string, score: number ) => {
        
        if( roomName in rooms ) {

            socket.emit($$roomCreated, false)

            console.error(`${roomName} room name has already been taken...`)
            return;
        }

        rooms[roomName] = { host: null, scoreToWin: score, clientsPlaying: {} }
        socket.join( roomName );
        socket.emit($$roomCreated, true)


    })

}