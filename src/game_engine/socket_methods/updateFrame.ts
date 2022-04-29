
import { Socket } from "socket.io"
import clients from "../clients"
import eggFunctions from "./eggFunctions";
import { ghostItem, speedItem } from "./gameItems";
import itemFunctions from "./itemFunctions";
import spawnItem from "./spawnItems";


export default function updateFrame( socket: Socket, io: Socket ) {

    
    let frame_state = 0;

    setInterval(() => {


/*         if( frame_state % 500 === 0 && frame_state < 500 ) {
            spawnItem()
        } */

        for( let id in clients ) {
            if( id === ghostItem || id === speedItem || id === 'egg' ) continue;
            itemFunctions( id )
        }
        
        eggFunctions();

        frame_state++;
        io.emit('position', clients);

    }, 1000/60)
}