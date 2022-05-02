
import clients from "../../clients";

export let isSpeedActive: { [index: string]: boolean } = {};

export function activeSpeedEffect( client: typeof clients[''], id: string ) {

    client.dx = client.dy + 3
    client.dy = client.dy + 3
    isSpeedActive[id] = true
    
    delete clients['speedItem']

    setTimeout(() => {
        client.dx = 3
        client.dy = 3
        isSpeedActive[id] = false
    }, 6000)

}