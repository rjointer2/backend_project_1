
import { Socket } from "socket.io";
import clients from "../clientObjects&Functions/clients";
import { ghostItem, ghostItemObject, speedItem, speedItemObject } from "../itemObjects&Fucntions/gameItems";

let item_array = [ ghostItem, speedItem ];

/**
 * @name sqawnItem
 * @description adds a new client object in the client dictionary. This
 * new client object is a "item" to affect the playable clients' props
 * @returns { void } 
 */

export default function spawnItem( ) {

    const randomItemArrayIntger = Math.floor(Math.random() * item_array.length );

    console.log(item_array[ randomItemArrayIntger ])

    if( speedItem === item_array[ randomItemArrayIntger ] ) clients[ speedItem] = speedItemObject
    if( ghostItem === item_array[ randomItemArrayIntger ] ) clients[ ghostItem] = ghostItemObject

}