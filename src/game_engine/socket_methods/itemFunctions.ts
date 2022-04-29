import clients from "../clients";
import { ghostItem, speedItem } from "./gameItems";


export default function itemFunctions( id: string ) {

    for( let item in clients ) {
        if( item === id || item === 'egg' ) continue;
        if( clients[id].x - clients[item].x > -20 
            && clients[id].x - clients[item].x < 20 
            && clients[id].y - clients[item].y > -20 
            && clients[id].y - clients[item].y < 20 ) {

                console.log('touching')

        }
    }

}