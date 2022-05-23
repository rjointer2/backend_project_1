
import { Socket } from "socket.io"
import clients from "../clients"
import magicBallFunctions from "./entityMethods/magicBallObject";
import { ghostItem, speedItem } from "./entityMethods/gameItems";
import itemFunctions from "./entityMethods/itemFunctions";
import spawnItem from "./spawnMethods/spawnItems";
import updateClients from './entityMethods/updateClients';


export default function updateFrame( socket: Socket, io: Socket ) {

    
    setInterval(() => {
        spawnItem()
    }, 3000)

    setInterval(() => {

        for( let id in clients ) {
            if( id === ghostItem || id === speedItem || id === 'magicBall' ) continue;
            itemFunctions( id )
        }
        
        magicBallFunctions();
        updateClients()

        io.emit('position', clients);

    }, 1000/60)
}