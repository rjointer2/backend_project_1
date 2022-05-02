
import { Socket } from "socket.io"
import clients from "../clients"
import eggFunctions from "./entityMethods/eggFunctions";
import { ghostItem, speedItem } from "./entityMethods/gameItems";
import itemFunctions from "./entityMethods/itemFunctions";
import spawnItem from "./spawnMethods/spawnItems";


export default function updateFrame( socket: Socket, io: Socket ) {

    
    setInterval(() => {
        spawnItem()
    }, 3000)

    setInterval(() => {

        for( let id in clients ) {
            if( id === ghostItem || id === speedItem || id === 'egg' ) continue;
            itemFunctions( id )
        }
        
        eggFunctions();

        io.emit('position', clients);

    }, 1000/60)
}