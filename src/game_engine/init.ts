
import { Socket } from "socket.io";
import connectClient from "./socket_methods/connectSocketMothods/connectClient";
import disconnectClient from "./socket_methods/connectSocketMothods/disconnectClient";
import updateFrame from "./socket_methods/updateFrame";
import receiveUserInputs from "./socket_methods/receiveUserInputs";
import spawnEgg from "./socket_methods/spawnMethods/spawnEgg";

export default function init( socket: Socket, io: Socket ) {

    updateFrame( socket, io );

    receiveUserInputs( socket, io );

    connectClient( socket, io );
    spawnEgg( socket, io );
    disconnectClient( socket, io );

}