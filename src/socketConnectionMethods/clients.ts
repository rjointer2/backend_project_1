
export type clientType = {[index: string]: { 
    x: number, y: number, host: boolean, 
    height: number, width: number,  
    dx: number, dy: number, speed: number,
    hold: boolean, heldBy?: null | string, color?: string
    xDir?: 'left' | 'right',

    left?: boolean,
    right?: boolean,
    up?: boolean,
    down?: boolean,

    defeated?: false
    
    speedActive?: boolean
    ghostActive?: boolean
    
}}

const clients: clientType = {};


export default clients