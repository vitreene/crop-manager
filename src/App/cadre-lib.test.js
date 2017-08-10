import cadreLib, {limit, missingValues, dimensions} from './cadre-lib'
import {cadreDefaults} from './config/initial'

const Cadre = new cadreLib();

describe( 'inputs', () => {

    it('width', () => {
        const entree = { name: 'width', value: 100 };
        const res = Cadre.inputs(entree, cadreDefaults);
        // console.log('cadre', res);
        expect(res.width).toEqual(entree.value);
    });

    it('height', () => {
        const entree = { name: 'height', value: 100 };
        const res = Cadre.inputs(entree, cadreDefaults);
        // console.log('cadre', res);
        expect(res.height).toEqual(entree.value);
    });

    /*
    it('import', () => {
        const entree = { name: 'height', value: 100 };
        const res = Cadre.importer(cadreDefaults);
        // console.log('import cadre', res);
        expect(res.plWidth).toEqual(cadreDefaults.width);
        expect(res.plHeight).toEqual(cadreDefaults.height);
        expect(res.width).toEqual('');
        expect(res.height).toEqual('');
    });
*/
});


describe( 'Limites', () => {

    it('est dans les limites', () => {
        const width =  150;
        const height = 100;
        const res = limit(width, height);
        expect(res.width).toBe(width);
        expect(res.height).toBe(height);
        expect(res.seuil).toBeFalsy();
    });

    it('width est trop grand', () => {
        const width =  5000;
        const height = 3000;
        const res = limit(width, height);
        // console.log('dims', res);
        
        expect(res.width).toBeLessThan(width);
        expect(res.height).toBeLessThan(height);
        expect(res.seuil).toBeTruthy();
        expect(res.width/res.height).toBeCloseTo(width / height, 2);
    });

    it('height est trop grand', () => {
        const width =  3000;
        const height = 5000;
        const res = limit(width, height);
        // console.log('dims', res);
        
        expect(res.width).toBeLessThan(width);
        expect(res.height).toBeLessThan(height);
        expect(res.seuil).toBeTruthy();
        expect(res.width/res.height).toBeCloseTo(width / height, 2);
    });

    it('width est trop petit', () => {
        const width =  8;
        const height = 10;
        const res = limit(width, height);
        // console.log('dims', res);
        
        expect(res.width).toBeGreaterThan(width);
        expect(res.height).toBeGreaterThan(height);
        expect(res.seuil).toBeTruthy();
        // expect(res.width/res.height).toBeCloseTo(width / height, 2);
    });

    it('height est trop petit', () => {
        const width =  10;
        const height = 8;
        const res = limit(width, height);
        // console.log('dims', res);
        
        expect(res.width).toBeGreaterThan(width);
        expect(res.height).toBeGreaterThan(height);
        expect(res.seuil).toBeTruthy();
        // expect(res.width/res.height).toBeCloseTo(width / height, 2);
    });

});

describe( 'missingKeys', () => {

    it('manque width', () => {
        const dim = {
            width: '',
            height: 205,
            ratio: 1.5
        };
        const res = missingValues(dim);
        console.log('missingKeys', res, typeof(res));
        expect(res).toBe('width');
        
    });
    it('manque tout', () => {
        const dim = {
            width: '',
            height: '',
            ratio: ''
        };
        const res = missingValues(dim);
        expect(res).toBe('height ratio width');
        
    });
});



describe( 'dimensions', () => {

    it('manque width', () => {
        const dim = {
            width: '',
            height: 205,
            ratio: 1.5
        };
        const res = dimensions(dim, cadreDefaults);
        // console.log('dimensions', res);
        expect(res.width).toEqual(Math.floor(dim.height * dim.ratio));       
    });

    it('manque tout', () => {
        const dim = {
            width: '',
            height: '',
            ratio: ''
        };
        const res = dimensions(dim, cadreDefaults);
        // console.log('dimensions', res);

        expect(res.width).toEqual(cadreDefaults.height * cadreDefaults.ratio);       
    });

});