import clients from "../../clients";


export const directionClientFacing = ( client1: typeof clients['']  ) => {

    const previousX = clients['magicBall'].x

    if( previousX - clients['magicBall'].x === 0 ) return;

    previousX - clients['magicBall'].x > 0 ? 
    clients['magicBall'].xDir = 'left':
    clients['magicBall'].xDir = 'right'

}


export const clientAcceleration = ( client1: typeof clients['']  ) => {
    
    clients['magicBall'].x += clients['magicBall'].dx
    clients['magicBall'].y += clients['magicBall'].dy

}