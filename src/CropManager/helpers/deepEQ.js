export default function deepEQ(nextProps, props, testFirst) {

    const objs = testFirst || Object.keys(nextProps);
    let result;

    function testEq(obj) {
        const eq = different(nextProps[obj], props[obj]);
        result = obj;
        return eq;    
    }

    const hasChanged = objs.some( testEq )
    return hasChanged ? result : false;
}

export function different(a, b) {
    
    if (a === b) return false;
    
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return true;
        
        for (let i = 0; i < keys.length; i++)
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return true;
        
        for (let i = 0; i < keys.length; i++)
            if(different(a[keys[i]], b[keys[i]])) return true;
        
        return false;
    }
    
return true;
}
    
