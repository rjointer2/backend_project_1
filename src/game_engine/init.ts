
import { Socket } from "socket.io";
import connectClient from "./socket_methods/connectClient";
import disconnectClient from "./socket_methods/disconnectClient";
import updateFrame from "./socket_methods/updateFrame";
import receiveUserInputs from "./socket_methods/receiveUserInputs";
import spawnEgg from "./socket_methods/spawnEgg";

export default function init( socket: Socket, io: Socket ) {
    

    spawnEgg( socket, io );

    updateFrame( socket, io );

    receiveUserInputs( socket, io );

    connectClient( socket, io );
    disconnectClient( socket, io );

}