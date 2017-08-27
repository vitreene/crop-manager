import deepEQ, {different} from './deepEq'


describe( ' true if different : deep equal neu & old ', () => {
    
    it('neu === old', () => {
     const old = {dX: 0, dY: 0};
     const neu = old;

     const res = different(neu, old);
     
    expect(res).toBeFalsy();
    });

    it('deep neu === old', () => {
     const old = {dX: 0, dY: 0};
     const neu = {dX: 0, dY: 0};

     const res = different(neu, old);
     
    expect(res).toBeFalsy();
    });

    it('deep neu !== old', () => {
     const old = {dX: 0, dY: 0};
     const neu = {dX: 0, dY: 1};

     const res = different(neu, old);
    //  console.log('res', res);
     
    expect(res).toBeTruthy();
    });

    it('deep 2nd neu !== old', () => {
     const old = {a: {dX: 0, dY: 0}, b:1};
     const neu = {a: {dX: 0, dY: 2}, b:1};

     const res = different(neu, old);
    //  console.log('res', res);
     
    expect(res).toBeTruthy();
    });

    it('deep 3nd neu !== old', () => {
     const old = {a: {dX: 0, dY: {b: 1}}, b:1};
     const neu = {a: {dX: 0, dY: {a: 1}}, b:1};

     const res = different(neu, old);
    //  console.log('res', res);
     
    expect(res).toBeTruthy();
    });

})

describe( ' what objecct is different : deepEq(neu, old) ', () => {

    it('property « a » is different', () => {
        const old = {a: {dX: 0, dY: {b: 1}}, b:1};
        const neu = {a: {dX: 0, dY: {a: 1}}, b:1};
   
        const res = deepEQ(neu, old, ['a', 'b']);
        console.log('res', res);
        
       expect(res).toBe('a');
    });
   

    it('property « b » is aqual', () => {
        const old = {a: {dX: 0, dY: {b: 1}}, b:1};
        const neu = {a: {dX: 0, dY: {a: 1}}, b:1};
   
        const res = deepEQ(neu, old, ['b']);
        console.log('res', res);
        
       expect(res).toBeFalsy();
    });
   

})

    
