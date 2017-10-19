/*
undo-redo : met à jour son state enfonction de l'action qu'il recoit.
    state ->
    past : array,
    present : transform,
    futur : array
*/
import {UNDO, REDO, DO, RAZ} from '../config/constantes'

const undoLib = {
    // ATTENTION si un seul argument, peut être : donnees ou state
    execute(action, donnees, state) {
        if (!donnees) return state;
        return this[action] && this[action](donnees, state);
    },

    [RAZ](transform) {
        return {
            past: [],
            present: transform,
            future: []
        }
    },

    [DO](transform, state) {
        if (!state) return state;
        
        const past = state.past.concat(state.present);
        const present = transform;
        const future = [];
        return {past, present, future}
    },

    [UNDO](state) {
        const future = [state.present].concat(state.future);
        const past = state.past.slice(0,-1);
        const present = state.past[state.past.length-1] || {};
         return {past, present, future}
    },
    
    [REDO](state) {
        const future = state.future.slice(1);
        const present = state.future[0];
        const past = state.past.concat([state.present]);
        return {past, present, future}
    }

};

export default undoLib;
