
import clients from "../clientObjects&Functions/clients";
import applySpeedItem from "./speedEffect";
import { clientCollisionDetection } from "../vectorsAndPhyiscsFunctions/collisionMethod";
import { ghostItem, magicBall, speedItem } from "./gameItems";
import applyGhostItem from "./ghostEffect";


export default function applyItemEffect( id: string ) {

    for( let item in clients ) {
        if( item === id || item === magicBall ) continue;
        if( clientCollisionDetection( clients[id], clients[item] ) ) {
            if( item === ghostItem ) applyGhostItem( clients[id] );
            if( item === speedItem ) applySpeedItem( clients[id] );
        }
    }

}