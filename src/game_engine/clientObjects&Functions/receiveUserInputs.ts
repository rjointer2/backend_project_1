
import { Socket } from "socket.io";
import { magicBall } from "../itemObjects&Fucntions/gameItems";
import { stopVelocityFromWallCollison } from "../vectorsAndPhyiscsFunctions/collisionMethod";
import clients from "./clients";


export default function receiveUserInputs( socket: Socket, io: Socket ) {


    let hash: { [index: string]: number } = {};

    socket.on('holdMagicBall', (res: { id: string, hold: boolean }) => {
        if( 
            clients[res.id].x - clients[magicBall].x > -40 
            && clients[res.id].x - clients[magicBall].x < 40 
            && clients[res.id].y - clients[magicBall].y > -40 
            && clients[res.id].y - clients[magicBall].y < 40  
        ) {
            clients[magicBall].heldBy = res.id 

            if( clients[magicBall].heldBy !== res.id ) return;

            //if( clients[magicBall].heldBy ) console.log( clients[magicBall].heldBy )

            if( res.hold === false ) clients[magicBall].heldBy = null
                

            if(!clients[magicBall].heldBy) {
                clients[magicBall].dx = (clients[magicBall].x - clients[res.id].x) * ( hash[res.id] / 250 )
                clients[magicBall].dy = (clients[magicBall].y - clients[res.id].y) * ( hash[res.id] / 250 )
            } 
            if( !hash[res.id] ) hash[res.id] = 0;
            if( hash[res.id] <= 200 ) hash[res.id]++
        } 
        
    })

    socket.on('aimMagicBall', ( res: {
        id: string, mx: number, my: number
    }) => {

        let x = res.mx
        let y = res.my
        let tempY = res.my - clients[res.id].y;
        let tempX = res.mx - clients[res.id].x;

        if( clients[res.id].x - clients[magicBall].x >= -40 
            && clients[res.id].x - clients[magicBall].x <= 40 
            && clients[res.id].y - clients[magicBall].y >= -40 
            && clients[res.id].y - clients[magicBall].y <= 40 
        ) {
            if( clients[magicBall].heldBy === res.id ) {

                if(  tempY >= 38 ) y = clients[res.id].y + 38
                if( tempY <= -38  ) y = clients[res.id].y - 38
        
                if(  tempX >= 38 ) x = clients[res.id].x + 38
                if( tempX <= -38  ) x = clients[res.id].x - 38

                stopVelocityFromWallCollison( clients[magicBall] )

                clients[magicBall].dx = 0;
                clients[magicBall].dy = 0;
        
                clients[magicBall].y = y
                clients[magicBall].x = x
                
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

