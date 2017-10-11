import undoLib from "./undoLib";

const UNDO = 'UNDO';
const REDO = 'REDO'; 
const DO = 'DO'; // update,
const RAZ = 'RAZ'; // init

const state = {
    past: [{n: 1}, {n: 2}, {n: 3}],
    present: {n: 4},
    future: [{n: 5}, {n: 6}]
}

const state2 = {
    past: [],
    present: {n: 1},
    future: []
}


describe( 'undo/redo', () => {

    it('RAZ', () => {

        const res = undoLib.execute(RAZ, {n: 7});
        console.log('RAZ undoLib', res);
        
        expect(res.present.n).toBe(7);
    })

    it('DO', () => {

        const res = undoLib.execute(DO, {n: 7}, state);
        console.log('DO undoLib', res);
        
        expect(res.present.n).toBe(7);
    })

    it('UNDO', () => {
        const res = undoLib.execute(UNDO, state);
        console.log('UNDO undoLib', res);
        
        expect(res.present.n).toBe(state.past[state.past.length-1].n);
        expect(res.past.length).toBe(state.past.length-1);
        expect(res.future.length).toBe(state.future.length+1);
        expect(res.future[0].n).toBe(state.present.n);
        // expect(res.present.n).toBe(state.future[0]);
    })
    
    it('REDO', () => {
        const res = undoLib.execute(REDO, state);
        console.log('REDO undoLib', res);
        
        expect(res.present.n).toBe(state.future[0].n);
        expect(res.future.length).toBe(state.future.length-1);
        expect(res.past.length).toBe(state.past.length+1);
        expect(res.past[res.past.length-1].n).toBe(state.present.n);
        // expect(res.present.n).toBe(state.future[0]);
    })
    
        it('UNDO empty', () => {
            const state = state2;
            const res = undoLib.execute(UNDO, state);
            console.log('UNDO undoLib', res);
            // console.log('UNDO keys', Object.keys(res.present),  Object.keys(res.present).length);
            
            expect(Object.keys(res.present).length).toBe(0);
            expect(res.past.length).toBe(state.past.length);
            expect(res.future.length).toBe(state.future.length+1);
            expect(res.future[0].n).toBe(state.present.n);
            // expect(res.present.n).toBe(state.future[0]);
        })
})