
import applyItemEffect from "../itemObjects&Fucntions/applyItemEffectFunction";
import { ghostItem, magicBall, speedItem } from "../itemObjects&Fucntions/gameItems";
import { stopVelocityFromWallCollison } from "../vectorsAndPhyiscsFunctions/collisionMethod";
import clients from "./clients";

export default function clientMethods() {

    if( clients ) {

        for( let id in clients ) {

            // if id isn't a socket client id then skip ireration
            if( id.length !== 20 ) continue;

            if( id === ghostItem || id === speedItem || id === magicBall ) continue;
            
            applyItemEffect( id )
            stopVelocityFromWallCollison( clients[id] )


            // enable client movement when prop is true
            if( clients[id].right ) clients[id].x = clients[id].x + clients[id].dx;
            if( clients[id].up ) clients[id].y = clients[id].y - clients[id].dy;
                
            if( clients[id].left ) clients[id].x = clients[id].x - clients[id].dx;
            if( clients[id].down ) clients[id].y = clients[id].y + clients[id].dy;

        }

    }

}