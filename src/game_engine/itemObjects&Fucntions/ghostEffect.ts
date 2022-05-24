
import clients, { clientType } from "../clientObjects&Functions/clients";
import { ghostItem } from "./gameItems";

export let isGhostActive: { [index: string]: boolean } = {};

export default function applyGhostItem( client: clientType[''] ) {
    
    client.ghostActive = true
    
    delete clients[ghostItem]

    setTimeout(() => {
        client.ghostActive = false
    }, 5000)

}