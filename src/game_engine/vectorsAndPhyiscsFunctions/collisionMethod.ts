
import { Client } from "socket.io/dist/client"
import clients, { clientType } from "../clientObjects&Functions/clients"

/** 
 * @name clientCollisionDetection
 * @description takes 2 args of client type objects to determine have collided
 * @param { Client } object
 * @param { Client } object 
 * 
 * @returns { boolean }
*/

export const clientCollisionDetection = ( client1: clientType[''], client2: clientType['']  ) => {
    if( client1.x - client2.x > -20 
        && client1.x - client2.x < 20 
        && client1.y - client2.y > -20 
        && client1.y - client2.y < 20 ) {

            if( client1.ghostActive ) return false

            return true
    }
}

/** 
 * @name velocityClientCollisionFromWall
 * @description takes 1 arg of a client object and take their directional x and velocity props and 
 * inverts velocity when object collides with the canvas walls
 * @param { Client } object
 * 
 * 
 * @returns { void }
*/

export const velocityClientCollisionFromWall = ( client1: clientType[''] ) => {

    // bottom wall
    if( client1.y > 460 ) {
        client1.dy = -client1.dy
        client1.y = 460
    }
    // right wall
    if( client1.x < 0 ) {
        client1.dx = -client1.dx
        client1.x = 0
    }
    // left wall
    if( client1.y < 0 ) {
        client1.dy = -client1.dy
        client1.y = 0
    }
    // top wall
    if( client1.x > 620 ) {
        client1.dx = -client1.dx
        client1.x = 620
    }

    if( !( client1.dy <= .6 && client1.dx <= .6  ) ) {
        client1.dx /= 1.001
        client1.dy /= 1.001
    }

}

export const stopVelocityFromWallCollison = ( client: clientType[''] ) => {
    // wall detction 
    if( client.y > 460 )   client.y = 460
    if( client.x < 10 )    client.x = 10
    if( client.y < 10 )    client.y = 10
    if( client.x > 620 )   client.x = 620

}