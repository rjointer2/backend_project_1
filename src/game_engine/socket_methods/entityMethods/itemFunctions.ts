import clients from "../../clients";
import { activeSpeedEffect } from "../itemEffectMethods/speedEffect";
import { clientCollisionDetection } from "../vectorsAndPhyiscsMethod/collisionMethod";
import { ghostItem, speedItem } from "./gameItems";


export default function itemFunctions( id: string ) {

    for( let item in clients ) {
        if( item === id || item === 'egg' ) continue;
        if( clientCollisionDetection( clients[id], clients[item] ) ) {
            activeSpeedEffect( clients[id], id )
        }
    }

}