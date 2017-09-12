export const RAD = Math.PI / 180
export const DEG = 180 / Math.PI
export const TOUCH = 'touch'
export const MOUSE = 'mouse'
export const START = 'start'
export const MOVE = 'move'
export const END = 'done'
export const DONE = 'done'
export const IDLE = 'idle'
export const CMD = 'commande'
export const R90 = 'R90'

// marge autour du cadre
export const PADDING = 5
// attenuer l'amplitude de la mise à l'échelle
export const SENSIBLE = 0.01 / 2

// scale min & max
export const SCALEMIN = 0.5
export const SCALEMAX = 10

export const isClient = typeof window !== "undefined";
