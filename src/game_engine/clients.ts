
const clients: {[index: string]: { 
    x: number, y: number, host: boolean, 
    height: number, width: number,  
    dx: number, dy: number, speed: number,
    hold: boolean, heldBy?: null | string, color?: string
}} = {};


export default clients