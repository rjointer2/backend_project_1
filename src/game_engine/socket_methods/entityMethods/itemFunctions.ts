import clients from "../../clients";
import { applySpeedEffect } from "../itemEffectMethods/speedEffect";
import { clientCollisionDetection } from "../vectorsAndPhyiscsMethod/collisionMethod";
import { ghostItem, speedItem } from "./gameItems";


export default function itemFunctions( id: string ) {

    for( let item in clients ) {
        if( item === id || item === 'magicBall' ) continue;
        if( clientCollisionDetection( clients[id], clients[item] ) ) {
            applySpeedEffect( clients[id], id )
        }
    }

}