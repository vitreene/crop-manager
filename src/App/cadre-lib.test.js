import cadreLib from './cadre-lib'
import {cadreDefaults} from './config/initial'

const Cadre = new cadreLib();

describe( 'inputs', () => {

    it('width', () => {
        const entree = { name: 'width', value: 100 };
        const res = Cadre.inputs(entree);
        console.log('cadre', res);
        expect(res.width).toEqual(entree.value);
    });

    it('height', () => {
        const entree = { name: 'height', value: 100 };
        const res = Cadre.inputs(entree);
        console.log('cadre', res);
        expect(res.height).toEqual(entree.value);
    });

    
    it('import', () => {
        const entree = { name: 'height', value: 100 };
        const res = Cadre.importer(cadreDefaults);
        console.log('import cadre', res);
        expect(res.plWidth).toEqual(cadreDefaults.width);
        expect(res.plHeight).toEqual(cadreDefaults.height);
        expect(res.width).toEqual('');
        expect(res.height).toEqual('');
    });


});


