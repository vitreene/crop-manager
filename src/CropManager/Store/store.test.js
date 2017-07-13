import {cover} from './transform'

describe( 'fonction cover', () => {

    it('les deux valeurs sont identiques si ratio >1', () => {
        const image = { width: 783, height: 420 };
        const cadre = {diagonale: 888.532, ratio: 1.5, marge: 10 };
        const res = cover(cadre, image);

    expect(res.x).toBeCloseTo(res.y, 2);
    });

    it('les deux valeurs sont identiques si ratio <1', () => {
        const image = { width: 783, height: 420 };
        const cadre = {diagonale: 888.532, ratio: 0.5, marge: 10 };
        const res = cover(cadre, image);

    expect(res.x).toBeCloseTo(res.y, 2);
    });

    it('l’image est plus grande que le cadre ratio <1', () => {
        const image = { width: 783, height: 420 };
        const cadre = {diagonale: 888.532, ratio: 0.5, marge: 10 };
        const res = cover(cadre, image);
        // console.dir(res);
    expect(res.w).toBeGreaterThan(res.width);
    expect(res.h).toBeGreaterThan(res.height);
    });

    it('l’image est plus grande que le cadre ratio >1', () => {
        const image = { width: 783, height: 420 };
        const cadre = {diagonale: 888.532, ratio: 1.5, marge: 10 };
        const res = cover(cadre, image);
        // console.dir(res);
    expect(res.w).toBeGreaterThan(res.width);
    expect(res.h).toBeGreaterThan(res.height);
    });

})