

// Game Item Types: STRINGS

import { clientType } from "../clientObjects&Functions/clients";

/**
 * @name magicBall
 * @description string type of magicBall
 * @returns {string} 
*/

export const magicBall = 'magicBall';

/**
 * @name speedItem
 * @description string type of speedItem
 * @returns {string} 
*/

export const speedItem = 'speedItem';

export const speedItemObject: clientType[''] = { 
    x: Math.floor(Math.random() * 480), y: Math.floor(Math.random() * 480), 
    height: 20, width: 20, host: false, 
    dx: 0, dy: 0, speed: 1, hold: false,
    color: "blue"
}

/**
 * @name ghostItem
 * @description string type of ghostItem
 * @returns {string} 
*/

export const ghostItem = 'ghostItem';

export const ghostItemObject: clientType['']  = { 
    x: Math.floor(Math.random() * 480), y: Math.floor(Math.random() * 480), 
    height: 20, width: 20, host: false, 
    dx: 0, dy: 0, speed: 1, hold: false,
    color: "black"
}
