
import clients from "../clients"
import { speedItem } from "./gameItems"

export default function eggFunctions() {

    if(clients['egg']) {

        for ( let id in clients ) {
            if( id === 'egg' ) continue;
            if( clients[id].x - clients['egg'].x > -20 
                && clients[id].x - clients['egg'].x < 20 
                && clients[id].y - clients['egg'].y > -20 
                && clients[id].y - clients['egg'].y < 20 ) {
    
                    console.log('touching')
    
            }
        }

        // bottom wall
        if( clients['egg'].y > 460 ) {
            clients['egg'].dy = -clients['egg'].dy
            clients['egg'].y = 460
        }
        // right wall
        if( clients['egg'].x < 0 ) {
            clients['egg'].dx = -clients['egg'].dx
            clients['egg'].x = 0
        }
        // left wall
        if( clients['egg'].y < 0 ) {
            clients['egg'].dy = -clients['egg'].dy
            clients['egg'].y = 0
        }
        // top wall
        if( clients['egg'].x > 620 ) {
            clients['egg'].dx = -clients['egg'].dx
            clients['egg'].x = 620
        }

        if( !( clients['egg'].dy <= .6 && clients['egg'].dx <= .6  ) ) {
            clients['egg'].dx /= 1.001
            clients['egg'].dy /= 1.001
        }


        clients['egg'].x += clients['egg'].dx
        clients['egg'].y += clients['egg'].dy

    }

}