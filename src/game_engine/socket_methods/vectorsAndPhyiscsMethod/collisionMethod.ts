
import clients from "../../clients"

export const clientCollisionDetection = ( client1: typeof clients[""], client2: typeof clients[""]  ) => {
    if( client1.x - client2.x > -20 
        && client1.x - client2.x < 20 
        && client1.y - client2.y > -20 
        && client1.y - client2.y < 20 ) {
            console.log('touching')
            return true
    }
}

export const velocityClientCollisionFromWall = ( client1: typeof clients[""] ) => {

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