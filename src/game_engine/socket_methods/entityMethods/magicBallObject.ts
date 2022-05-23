
import clients from "../../clients"
import { clientCollisionDetection, velocityClientCollisionFromWall } from "../vectorsAndPhyiscsMethod/collisionMethod";
import { clientAcceleration, directionClientFacing } from "../vectorsAndPhyiscsMethod/vectorAndDirectionMethods";

export default function magicBallObjectFunction() {

    if(clients['magicBall']) {

        for( let id in clients ) {
            if( id === 'magicBall' ) continue;
            clientCollisionDetection( clients[id], clients['magicBall'] )
        }

        velocityClientCollisionFromWall( clients['magicBall'] );

        directionClientFacing( clients["magicBall"] );
        
        clientAcceleration( clients['magicBall'] )


    }

}