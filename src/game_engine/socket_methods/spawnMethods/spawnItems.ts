
import { Socket } from "socket.io";
import clients from "../../clients";
import { speedIncreaseItemObject } from "../entityMethods/gameItems";

let item_array = [  ];

export default function spawnItem( ) {

    clients['speedItem'] = speedIncreaseItemObject
    clients['speedItem'].color = 'blue'

}