
import clients, { clientType } from "../clientObjects&Functions/clients";
import { speedItem } from "./gameItems";


export default function applySpeedEffect( client: clientType[''], ) {

    client.dx = client.dx + 3
    client.dy = client.dy + 3
    client.speedActive = true
    
    delete clients[speedItem]

    setTimeout(() => {
        client.dx = 1
        client.dy = 1
        client.speedActive = false
    }, 5000)

}