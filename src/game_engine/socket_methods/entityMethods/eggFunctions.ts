
import clients from "../../clients"
import { clientCollisionDetection, velocityClientCollisionFromWall } from "../vectorsAndPhyiscsMethod/collisionMethod";
import { clientAcceleration, directionClientFacing } from "../vectorsAndPhyiscsMethod/vectorAndDirectionMethods";

export default function eggFunctions() {

    if(clients['egg']) {

        for( let id in clients ) {
            if( id === 'egg' ) continue;
            clientCollisionDetection( clients[id], clients['egg'] )
        }

        velocityClientCollisionFromWall( clients['egg'] );

        directionClientFacing( clients["egg"] );
        
        clientAcceleration( clients['egg'] )


    }

}