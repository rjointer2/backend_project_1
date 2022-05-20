import clients from "../../clients";


export const directionClientFacing = ( client1: typeof clients['']  ) => {

    const previousX = clients['egg'].x

    if( previousX - clients['egg'].x === 0 ) return;

    previousX - clients['egg'].x > 0 ? 
    clients['egg'].xDir = 'left':
    clients['egg'].xDir = 'right'

}


export const clientAcceleration = ( client1: typeof clients['']  ) => {
    
    clients['egg'].x += clients['egg'].dx
    clients['egg'].y += clients['egg'].dy

}