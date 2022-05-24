
import clients from "../clientObjects&Functions/clients"
import { magicBall } from "../itemObjects&Fucntions/gameItems";
import { clientCollisionDetection, velocityClientCollisionFromWall } from "../vectorsAndPhyiscsFunctions/collisionMethod";
import { directionClientFacing } from "../vectorsAndPhyiscsFunctions/vectorAndDirectionMethods";


export default function magicBallObjectFunction() {

    if(clients[magicBall]) {

        for( let id in clients ) {
            if( id === magicBall ) continue;
            if( clientCollisionDetection( clients[id], clients[magicBall] ) ) console.log('touching')
            
        }

        /* Detects if the magic ball has touch a  */
        velocityClientCollisionFromWall( clients[magicBall] );

        directionClientFacing( clients[magicBall] );
        
        clients[magicBall].x += clients[magicBall].dx
        clients[magicBall].y += clients[magicBall].dy


    }

}