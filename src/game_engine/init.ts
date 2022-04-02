
import { Socket } from "socket.io";
import clients from "./clients";
import connectClient from "./socket_methods/connectClient";
import disconnectClient from "./socket_methods/disconnectClient";
import eggResponse from "./socket_methods/eggResponse";
import receiveUserInputs from "./socket_methods/receiveUserInputs";
import spawnEgg from "./socket_methods/spawnEgg";

export default function init( socket: Socket, io: Socket ) {
    

    spawnEgg( socket, io )
    eggResponse( socket, io );

    receiveUserInputs( socket, io );

    connectClient( socket, io );
    disconnectClient( socket, io );

}