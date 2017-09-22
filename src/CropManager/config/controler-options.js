const controlerOptionsParams = {
    // smooth : apply a transition to the transformation
    // isLoading : déplacé vers props. actuellement 
    'init': {isLoading: false, smooth: true},
    'inputPosition': {smooth: false},
    'updatePosition': {},
    'pivoter': {smooth: true},
    'rotate90': {smooth: true},
    'updateScale': {smooth: false},
    'updateRotate': {smooth: false},
    'transformPreset': {smooth: true},
    'resize': {smooth: false},
};

export default function controlerOptions(action, state) {
   console.log('action', action, controlerOptionsParams[action]);
   
   return Object.assign(
       state.options,
       controlerOptionsParams[action]
   )  
}
