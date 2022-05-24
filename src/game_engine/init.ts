
import { Socket } from "socket.io";
import connectClient from "./clientObjects&Functions/connectClient";
import disconnectClient from "./clientObjects&Functions/disconnectClient";
import updateFrame from "./updateFrame";
import receiveUserInputs from "./clientObjects&Functions/receiveUserInputs";
import spawnMagicBall from "./spawnMethods/spawnMagicBall";


export const init = ( socket: Socket, io: Socket ) => {

   
    // client connection functions
    connectClient( socket, io );
    disconnectClient( socket, io );

    spawnMagicBall( socket, io );


    receiveUserInputs( socket, io );


    // methods to update objects
    updateFrame( socket, io );


}

