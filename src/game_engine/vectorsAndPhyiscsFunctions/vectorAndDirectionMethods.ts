
import clients, { clientType } from "../clientObjects&Functions/clients";

/** 
 * @name directionClientFacing
 * @description takes 1 arg of a client and change's client object xDir string 
 * prop to "left" or "right"
 * @param { clientType } object
 * 
 * @returns { void }
*/


export const directionClientFacing = ( client: clientType['']  ) => {

    const previousX = client.x

    if( previousX - client.x === 0 ) return;

    previousX - client.x > 0 ? 
    client.xDir = 'left':
    client.xDir = 'right'

}
