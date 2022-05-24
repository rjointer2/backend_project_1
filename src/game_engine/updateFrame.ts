
import { Socket } from "socket.io"
import clients from "./clientObjects&Functions/clients"
import magicBallFunctions from "./magicBallObject&Functions/magicBallObject";
import { ghostItem, magicBall, speedItem } from "./itemObjects&Fucntions/gameItems";
import applyItemEffect from "./itemObjects&Fucntions/applyItemEffectFunction";
import spawnItem from "./spawnMethods/spawnItems";
import updateClients from './clientObjects&Functions/updateClients';


export default function updateFrame( socket: Socket, io: Socket ) {

    // every 30 seconds spawns a new item object in the client dictionary
    setInterval(() => {
        spawnItem()
    }, 30000)


    // 60 fps functions are invoked

    setInterval(() => {

        magicBallFunctions();
        updateClients()

        io.emit('position', clients);

    }, 1000/60)
}