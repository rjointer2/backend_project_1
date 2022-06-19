
import clients from "./clients"

export const rooms: { 
    [ roomName: string ]: { 
        host: null | string
        scoreToWin: number
        clientsPlaying: { [ socketID: string ]: typeof clients }
    } 
} = {};

