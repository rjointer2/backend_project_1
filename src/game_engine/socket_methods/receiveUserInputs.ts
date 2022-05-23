
import { Socket } from "socket.io";
import clients from "../clients";

type key_map = {
    ArrowUp: { pressed: false, direction: "ArrowUp" },
    ArrowDown: { pressed: false, direction: "ArrowDown" },
    ArrowLeft: { pressed: false, direction: "ArrowLeft" },
    ArrowRight: { pressed: false, direction: "ArrowRight" },
}



export default function receiveUserInputs( socket: Socket, io: Socket ) {


    let hash: { [index: string]: number } = {};

    socket.on('holdMagicBall', (res: { id: string, hold: boolean }) => {
        if( 
            clients[res.id].x - clients['magicBall'].x > -40 
            && clients[res.id].x - clients['magicBall'].x < 40 
            && clients[res.id].y - clients['magicBall'].y > -40 
            && clients[res.id].y - clients['magicBall'].y < 40  
        ) {
            clients['magicBall'].heldBy = res.id 

            if( clients['magicBall'].heldBy !== res.id ) return;

            if( clients['magicBall'].heldBy ) console.log( clients['magicBall'].heldBy )

            if( res.hold === false ) clients['magicBall'].heldBy = null
                

            if(!clients['magicBall'].heldBy) {
                clients['magicBall'].dx = (clients['magicBall'].x - clients[res.id].x) * ( hash[res.id] / 250 )
                clients['magicBall'].dy = (clients['magicBall'].y - clients[res.id].y) * ( hash[res.id] / 250 )
                console.log(
                    'yspeed: ', clients['magicBall'].dy,
                    'xsped: ', clients['magicBall'].dx
                )
            } 
            if( !hash[res.id] ) hash[res.id] = 0;
            if( hash[res.id] <= 200 ) hash[res.id]++
            console.log(hash[res.id] )
        } 
        
    })

    socket.on('aimMagicBall', ( res: {
        id: string, mx: number, my: number
    }) => {

        let x = res.mx
        let y = res.my
        let tempY = res.my - clients[res.id].y;
        let tempX = res.mx - clients[res.id].x;

        if( clients[res.id].x - clients['magicBall'].x >= -40 
            && clients[res.id].x - clients['magicBall'].x <= 40 
            && clients[res.id].y - clients['magicBall'].y >= -40 
            && clients[res.id].y - clients['magicBall'].y <= 40 
        ) {
            if( clients['magicBall'].heldBy === res.id ) {

                if(  tempY >= 38 ) y = clients[res.id].y + 38
                if( tempY <= -38  ) y = clients[res.id].y - 38
        
                if(  tempX >= 38 ) x = clients[res.id].x + 38
                if( tempX <= -38  ) x = clients[res.id].x - 38

                // bottom wall
                if( y > 460 ) y = 460
                // right wall
                if( x < 0 ) x = 0
                // left wall
                if( y < 0 ) y = 0
                // top wall
                if( x > 620 ) x = 620

                clients['magicBall'].dx = 0;
                clients['magicBall'].dy = 0;
        
                clients['magicBall'].y = y
                clients['magicBall'].x = x
                
            }
                                       
        }
    });


    socket.on("move", async( res: any
    ) => {

        if(clients[res.id]) {

            res.direction.ArrowRight || res.direction.d ? clients[res.id].right = true : clients[res.id].right = false 
            res.direction.ArrowUp || res.direction.w ? clients[res.id].up = true : clients[res.id].up = false 
            
            res.direction.ArrowLeft || res.direction.a ? clients[res.id].left = true : clients[res.id].left = false
            res.direction.ArrowDown || res.direction.s ? clients[res.id].down = true : clients[res.id].down = false
        

        }

    })

}


/* 

console.log( res  )

            

            if( !res.direction.q ) {

                const prevX =  clients[res.id].x 


                if( res.direction.ArrowRight || res.direction.d ) clients[res.id].x = clients[res.id].x + clients[res.id].dx;
                if( res.direction.ArrowUp || res.direction.w ) clients[res.id].y = clients[res.id].y - clients[res.id].dy;
                
                if( res.direction.ArrowLeft || res.direction.a ) clients[res.id].x = clients[res.id].x - clients[res.id].dx;
                if( res.direction.ArrowDown || res.direction.s ) clients[res.id].y = clients[res.id].y + clients[res.id].dy;
                clients[res.id].hold = false


                if( prevX - clients[res.id].x === 0 ) return;

                prevX - clients[res.id].x > 0 ? 
                clients[res.id].xDir = 'left':
                clients[res.id].xDir = 'right'

                console.log(  clients[res.id].dx )

            }
        
            // wall detction 
            if( clients[res.id].y > 460 )   clients[res.id].y = 460
            if( clients[res.id].x < 10 )    clients[res.id].x = 10
            if( clients[res.id].y < 10 )    clients[res.id].y = 10
            if( clients[res.id].x > 620 )   clients[res.id].x = 620

        }

        io.emit('position', clients);

*/