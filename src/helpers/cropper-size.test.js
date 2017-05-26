import {setCropper, setCropWrapper} from './cropper-size';

describe( 'fonction SetCropper', () => {

    it('augmente les valeurs', () => {
        const cropWrapper = { w: 783, h: 420 };
        const crop = {w: 300, h: 300, };
    // resultat : 420 / 420
    const res = setCropper(cropWrapper, crop);
    // console.log('augmente les valeurs res',res);
    expect(res.w).toBe(420);
    expect(res.h).toBe(420);  
    });

    it('reduit les valeurs', () => {
        const cropWrapper = { w: 783, h: 420 };
        const crop = {w: 800, h: 800, };
    // resultat : 420 / 420
    const res = setCropper(cropWrapper, crop);
    // console.log('reduit les valeurs res',res);

    expect(res.w).toBe(420);
    expect(res.h).toBe(420);
    });

    it('meme valeurs', () => {
        const cropWrapper = { w: 420, h: 420 };
        const crop = {w: 420, h: 420, };
    // resultat : 420 / 420
    const res = setCropper(cropWrapper, crop);
    // console.log('meme valeurs : res',res);

    expect(res.w).toBe(420);
    expect(res.h).toBe(420);
    });

    it('wrapper vertical', () => {
        const cropWrapper = { w: 420, h: 783 };
        const crop = {w: 300, h: 300, };
    // resultat : 420 / 420
    const res = setCropper(cropWrapper, crop);
    // console.log('wrapper vertical : res',res);

    expect(res.w).toBe(420);
    expect(res.h).toBe(420);
    });

    it('cropper vertical', () => {
        const cropWrapper = { w: 420, h: 783 };
        const crop = {w: 300, h: 500, };
    // resultat : 420 / 700
    const res = setCropper(cropWrapper, crop);
    // console.log('cropper vertical : res',res);

    expect(res.w).toBe(420);
    expect(res.h).toBe(700);
    });

    it('cropper extreme vertical', () => {
        const crop = {w: 300, h: 800, };
        const cropWrapper = { w: 420, h: 783 };
    // resultat : 293,625 / 783
    const res = setCropper(cropWrapper, crop);
    // console.log('cropper extreme vertical : res',res);

    expect(res.w).toBe(293.625);
    expect(res.h).toBe(783);
    });

    it('return false si one value is 0', () => {
        const crop = {w: 0, h: 800 };
        const cropWrapper = { w: 420, h: 783 };
    // resultat : 293,625 / 783
    const res = setCropper(cropWrapper, crop);
    // console.log('cropper return false si one value is 0 : res',res);
    expect(res).toBe(false);
    });

})

describe( 'fonction SetCropper', () => {
    it('return uniform padding', () => {
        const size = {width: 1000, height: 1400 };
        const crop = { padding: 10 };
        // resultat : 800 / 1200
        const res = setCropWrapper(size, crop);
        // console.log('return uniform padding : res',res);
        expect(res.w).toBe(800);
        expect(res.h).toBe(1200);
    });
})