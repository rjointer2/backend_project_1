
import clients from "../../clients";

export default function clientMethods() {

    if( clients ) {

        for( let id in clients ) {

            if( id.length !== 20 ) continue;

            if( clients[id].right ) clients[id].x = clients[id].x + clients[id].dx;
            if( clients[id].up ) clients[id].y = clients[id].y - clients[id].dy;
                
            if( clients[id].left ) clients[id].x = clients[id].x - clients[id].dx;
            if( clients[id].down ) clients[id].y = clients[id].y + clients[id].dy;

        }

    }

}